'use client';

import { searchStore } from '@/services';
import { ISearchStore } from '@/types';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

interface ISearchProvider {
  children: ReactNode;
}
type SearchStoreAPI = ReturnType<typeof searchStore>;

const SearchStoreContext = createContext<SearchStoreAPI | undefined>(undefined);
export const SearchStoreProvider = ({ children }: ISearchProvider) => {
  const searchRef = useRef<SearchStoreAPI>();
  if (!searchRef.current) searchRef.current = searchStore();

  return <SearchStoreContext.Provider value={searchRef.current}>{children}</SearchStoreContext.Provider>;
};

const _useSearchStore = <T,>(selector: (store: ISearchStore) => T): T => {
  const searchStoreContext = useContext(SearchStoreContext);
  if (!searchStoreContext) throw new Error('useSearchStore must be used within a SearchStoreProvider');
  return useStore(searchStoreContext, selector);
};

export const useSearchStore = () => _useSearchStore((state) => state);
