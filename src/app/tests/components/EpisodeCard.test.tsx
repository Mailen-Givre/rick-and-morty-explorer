import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodeCard from '../../components/EpisodeCard';
import '@testing-library/jest-dom';

describe('EpisodeCard Component', () => {
    const mockEpisode = {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: [
            'https://rickandmortyapi.com/api/character/1',
            'https://rickandmortyapi.com/api/character/2',
        ],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z',
    };

    it('renders episode information correctly', () => {
        render(<EpisodeCard episode={mockEpisode} />);

        expect(screen.getByText('Pilot')).toBeInTheDocument();
        expect(screen.getByText('S01E01')).toBeInTheDocument();
        expect(screen.getByText('December 2, 2013')).toBeInTheDocument();
        expect(screen.getByText('Characters: 2')).toBeInTheDocument();
    });
});