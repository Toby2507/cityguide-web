'use client';

import { propertyStore } from '@/services';
import { IPropertyStore } from '@/types';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

interface Props {
  children: ReactNode;
}
type PropertyStoreAPI = ReturnType<typeof propertyStore>;

const PropertyStoreContext = createContext<PropertyStoreAPI | undefined>(undefined);
export const PropertyStoreProvider = ({ children }: Props) => {
  const propertyRef = useRef<PropertyStoreAPI>();
  if (!propertyRef.current) propertyRef.current = propertyStore();

  return <PropertyStoreContext.Provider value={propertyRef.current}>{children}</PropertyStoreContext.Provider>;
};

const _usePropertyStore = <T,>(selector: (store: IPropertyStore) => T): T => {
  const propertyStoreContext = useContext(PropertyStoreContext);
  if (!propertyStoreContext) throw new Error('usePropertyStore must be used within a PropertyStoreProvider');
  return useStore(propertyStoreContext, selector);
};

export const usePropertyStore = () => _usePropertyStore((state) => state);
