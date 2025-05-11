import React from 'react';
import { Episode } from '../api/rickAndMorty';

interface EpisodeCardProps {
    episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 ">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-gray-800">{episode.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{episode.episode}</p>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {episode.air_date}
                </span>
            </div>
            <div className="mt-2">
                <p className="text-xs text-gray-500">Characters: {episode.characters.length}</p>
            </div>
        </div>
    );
};

export default EpisodeCard;