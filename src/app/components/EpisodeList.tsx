import React from 'react';
import { Episode } from '../api/rickAndMorty';
import EpisodeCard from './EpisodeCard';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

interface EpisodeListProps {
    title: string;
    episodes: Episode[];
    loading: boolean;
    error: string | null;
    character1Name?: string;
    character2Name?: string;
    emptyMessage?: string;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
    title,
    episodes,
    loading,
    error,
    character1Name,
    character2Name,
    emptyMessage = "No episodes found"
}) => {
    // Format the title based on the provided character names
    const getFormattedTitle = () => {
        if (title.includes('#1') && character1Name) {
            return title.replace('Character #1', character1Name);
        }
        if (title.includes('#2') && character2Name) {
            return title.replace('Character #2', character2Name);
        }
        if (title.includes('#1') && title.includes('#2') && character1Name && character2Name) {
            return title
                .replace('Character #1', character1Name)
                .replace('Character #2', character2Name);
        }
        return title;
    };

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="bg-[rgb(var(--rick-blue))] rounded-lg p-4 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{getFormattedTitle()}</h2>

            {loading ? (
                <Loading />
            ) : episodes.length === 0 ? (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <p className="text-gray-500">{emptyMessage}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {episodes.map((episode) => (
                        <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EpisodeList;