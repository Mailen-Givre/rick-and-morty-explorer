import { useState, useEffect } from 'react';
import { fetchCharacters, Character } from '../api/rickAndMorty';

export const useCharacters = (initialPage = 1) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        currentPage: initialPage,
        totalPages: 0,
    });

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                setLoading(true);
                const data = await fetchCharacters(pagination.currentPage);
                setCharacters(data.results);
                setPagination({
                    currentPage: pagination.currentPage,
                    totalPages: data.info.pages,
                });
                setError(null);
            } catch (err) {
                setError('Failed to fetch characters. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCharacters();
    }, [pagination.currentPage]);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, currentPage: page }));
        }
    };

    return {
        characters,
        loading,
        error,
        pagination,
        goToPage,
    };
};