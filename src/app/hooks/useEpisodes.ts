import { useState, useEffect } from 'react';
import {
    fetchMultipleEpisodes,
    getEpisodeIdsFromUrls,
    Episode,
    Character
} from '../api/rickAndMorty';

interface UseEpisodesReturn {
    character1Episodes: Episode[];
    character2Episodes: Episode[];
    sharedEpisodes: Episode[];
    loading: boolean;
    error: string | null;
}

export const useEpisodes = (
    character1: Character | null,
    character2: Character | null
): UseEpisodesReturn => {
    const [character1Episodes, setCharacter1Episodes] = useState<Episode[]>([]);
    const [character2Episodes, setCharacter2Episodes] = useState<Episode[]>([]);
    const [sharedEpisodes, setSharedEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEpisodes = async () => {
            if (!character1 && !character2) {
                // Reset if no characters are selected
                setCharacter1Episodes([]);
                setCharacter2Episodes([]);
                setSharedEpisodes([]);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Get episode IDs for each character
                const char1EpisodeIds = character1 ? getEpisodeIdsFromUrls(character1.episode) : [];
                const char2EpisodeIds = character2 ? getEpisodeIdsFromUrls(character2.episode) : [];

                // Find unique and shared episode IDs
                const uniqueChar1EpisodeIds = character1 && character2
                    ? char1EpisodeIds.filter(id => !char2EpisodeIds.includes(id))
                    : char1EpisodeIds;

                const uniqueChar2EpisodeIds = character1 && character2
                    ? char2EpisodeIds.filter(id => !char1EpisodeIds.includes(id))
                    : char2EpisodeIds;

                const sharedEpisodeIds = character1 && character2
                    ? char1EpisodeIds.filter(id => char2EpisodeIds.includes(id))
                    : [];

                // Fetch episodes for each category
                const [char1Episodes, char2Episodes, sharedEpisodesData] = await Promise.all([
                    uniqueChar1EpisodeIds.length > 0 ? fetchMultipleEpisodes(uniqueChar1EpisodeIds) : [],
                    uniqueChar2EpisodeIds.length > 0 ? fetchMultipleEpisodes(uniqueChar2EpisodeIds) : [],
                    sharedEpisodeIds.length > 0 ? fetchMultipleEpisodes(sharedEpisodeIds) : [],
                ]);

                setCharacter1Episodes(char1Episodes);
                setCharacter2Episodes(char2Episodes);
                setSharedEpisodes(sharedEpisodesData);
            } catch (err) {
                setError('Failed to fetch episodes. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadEpisodes();
    }, [character1, character2]);

    return {
        character1Episodes,
        character2Episodes,
        sharedEpisodes,
        loading,
        error,
    };
};