import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '../../components/CharacterCard';
import '@testing-library/jest-dom';

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />
    }
}));

describe('CharacterCard Component', () => {
    const mockCharacter = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
    };

    const mockOnSelect = jest.fn();

    it('renders character information correctly', () => {
        render(
            <CharacterCard
                character={mockCharacter}
                isSelected={false}
                onSelect={mockOnSelect}
            />
        );

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Alive - Human')).toBeInTheDocument();
        expect(screen.getByText('Last known location:')).toBeInTheDocument();
        expect(screen.getByText('Earth')).toBeInTheDocument();
    });

    it('calls onSelect when clicked', () => {
        render(
            <CharacterCard
                character={mockCharacter}
                isSelected={false}
                onSelect={mockOnSelect}
            />
        );

        fireEvent.click(screen.getByText('Rick Sanchez'));
        expect(mockOnSelect).toHaveBeenCalledWith(mockCharacter);
    });

    it('shows selection indicator when selected', () => {
        const { container } = render(
            <CharacterCard
                character={mockCharacter}
                isSelected={true}
                onSelect={mockOnSelect}
            />
        );

        // Check for the selection ring
        expect(container.firstChild).toHaveClass('ring-4');
        expect(container.firstChild).toHaveClass('ring-[rgb(var(--portal-green))]');
    });

    it('displays the correct status color', () => {
        const { container } = render(
            <CharacterCard
                character={mockCharacter}
                isSelected={false}
                onSelect={mockOnSelect}
            />
        );

        // Find the status indicator dot
        const statusDot = container.querySelector('.h-3.w-3.rounded-full');
        expect(statusDot).toHaveClass('bg-[rgb(var(--portal-green))]'); // 'Alive' status should be green
    });
});