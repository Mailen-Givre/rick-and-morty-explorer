
import Image from 'next/image';
import { Character } from '../api/rickAndMorty';

interface CharacterCardProps {
    character: Character;
    isSelected: boolean;
    onSelect: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
    character,
    isSelected,
    onSelect
}) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'alive':
                return 'bg-[rgb(var(--portal-green))]';
            case 'dead':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div
            className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 ${isSelected ? 'ring-4 ring-[rgb(var(--portal-green))]' : ''}`}
            onClick={() => onSelect(character)}
        >
            <div className="relative h-48 w-full">
                <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 truncate">{character.name}</h3>
                <div className="flex items-center mt-2">
                    <span className={`h-3 w-3 rounded-full ${getStatusColor(character.status)} mr-2`}></span>
                    <span className="text-sm text-gray-600">{character.status} - {character.species}</span>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                    <p>Last known location:</p>
                    <p className="truncate font-medium">{character.location.name}</p>
                </div>
            </div>
            {isSelected && (
                <div className="absolute top-2 right-2 bg-[rgb(var(--portal-green))] text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default CharacterCard;