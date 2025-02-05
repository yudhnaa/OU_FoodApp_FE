import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { endpoints, authApi } from '@/configs/APIs';
import { useAuth } from "@/components/AuthContext";

interface SearchFilters {
    keyword?: string;
    min_price?: number;
    max_price?: number;
    food_type?: number;
    store_id?: number;
}

interface SearchContextProps {
    searchText: string;
    setSearchText: (text: string) => void;
    filters: SearchFilters;
    setFilters: (filters: SearchFilters) => void;
    searchResults: any[];
    isLoading: boolean;
    performSearch: (filters: SearchFilters) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { access_token } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState<SearchFilters>({});
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const performSearch = useMemo(() =>
        debounce(async (searchFilters: SearchFilters) => {
            if (!searchFilters.keyword?.trim() && !searchFilters.min_price && !searchFilters.max_price
                && !searchFilters.food_type && !searchFilters.store_id) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                Object.entries(searchFilters).forEach(([key, value]) => {
                    if (value !== undefined && value !== '') {
                        params.append(key, value.toString());
                    }
                });

                const response = await authApi(access_token).get(`${endpoints['search']}?${params.toString()}`);
                setSearchResults(response.data || []);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 500), [access_token]);

    return (
        <SearchContext.Provider value={{ searchText, setSearchText, filters, setFilters, searchResults, isLoading, performSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};