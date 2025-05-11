import React from 'react';
import { Character } from '../api/rickAndMorty';
import CharacterCard from './CharacterCard';
import Pagination from './Pagination';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

interface CharacterListProps {
    title: string;
    characters: Character[];
    loading: boolean;
    error: string | null;
    selectedCharacter: Character | null;
    onSelectCharacter: (character: Character) => void;
    pagination: {
        currentPage: number;
        totalPages: number;
    };
    onPageChange: (page: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
    title,
    characters,
    loading,
    error,
    selectedCharacter,
    onSelectCharacter,
    pagination,
    onPageChange,
}) => {
    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="w-full bg-[rgb(var(--rick-blue))] rounded-lg p-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                        {characters.map((character) => (
                            <CharacterCard
                                key={character.id}
                                character={character}
                                isSelected={selectedCharacter?.id === character.id}
                                onSelect={onSelectCharacter}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={onPageChange}
                    />
                </>
            )}
        </div>
    );
};

export default CharacterList;