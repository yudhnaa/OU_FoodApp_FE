import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { endpoints, authApi } from '@/configs/APIs';
import { useAuth } from "@/components/AuthContext";

interface SearchFilters {
    store_keyword?: string;
    dish_keyword?: string;
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
    searchResults2: any[];
    isLoading: boolean;
    performSearch: (filters: SearchFilters) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { access_token } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState<SearchFilters>({});
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchResults2, setSearchResults2] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const performSearch = useMemo(() =>
        debounce(async (searchFilters: SearchFilters) => {
            if (!searchFilters.store_keyword?.trim() && !searchFilters.dish_keyword?.trim()
                && !searchFilters.min_price && !searchFilters.max_price
                && !searchFilters.food_type && !searchFilters.store_id) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                Object.entries(searchFilters).forEach(([key, value]) => {
                    if (value !== undefined && value !== '' && key !== 'store_keyword') {
                        params.append(key, value.toString());
                    }
                });

                const response = await authApi(access_token).get(`${endpoints['search']}?${params.toString()}`);
                setSearchResults(response.data || []);

                const params2 = new URLSearchParams();
                Object.entries(searchFilters).forEach(([key, value]) => {
                    if (value !== undefined && key === 'store_keyword') {
                        params2.append(key, value.toString());
                    }
                });

                const response2 = await authApi(access_token).get(`${endpoints['search']}?${params2.toString()}`);
                setSearchResults2(response2.data || []);
                console.log("Search result 2: ", response2.data)


            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
                setSearchResults2([]);
            } finally {
                setIsLoading(false);
            }
        }, 500), [access_token]);

    return (
        <SearchContext.Provider value={{ searchText, setSearchText, filters, setFilters, searchResults, searchResults2, isLoading, performSearch }}>
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