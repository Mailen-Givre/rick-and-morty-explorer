const API_BASE_URL = "https://rickandmortyapi.com/api";

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

export interface PaginatedResponse<T> {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: T[];
}

export const fetchCharacters = async (page = 1): Promise<PaginatedResponse<Character>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/character/?page=${page}`);
        if (!response.ok) {
            throw new Error("Failed to fetch characters");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
};

export const fetchMultipleEpisodes = async (ids: number[]): Promise<Episode[]> => {
    if (ids.length === 0) return [];

    try {
        const response = await fetch(`${API_BASE_URL}/episode/${ids.join(',')}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch episodes`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error(`Error fetching multiple episodes:`, error);
        throw error;
    }
};

export const getEpisodeIdsFromUrls = (episodeUrls: string[]): number[] => {
    return episodeUrls.map(url => parseInt(url.split('/').pop() || "0", 10)).filter(id => id > 0);
};