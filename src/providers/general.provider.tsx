import { generalStore } from '@/services';
import { IGeneralStore } from '@/types';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

interface Props {
  children: ReactNode;
}
type GeneralStoreAPI = ReturnType<typeof generalStore>;

const GeneralStoreContext = createContext<GeneralStoreAPI | undefined>(undefined);
export const GeneralStoreProvider = ({ children }: Props) => {
  const storeRef = useRef<GeneralStoreAPI>();
  if (!storeRef.current) storeRef.current = generalStore();

  return <GeneralStoreContext.Provider value={storeRef.current}>{children}</GeneralStoreContext.Provider>;
};

const _useGeneralStore = <T,>(selector: (store: IGeneralStore) => T): T => {
  const generalStoreContext = useContext(GeneralStoreContext);
  if (!generalStoreContext) throw new Error('useGeneralStore must be used within a GeneralStoreProvider');
  return useStore(generalStoreContext, selector);
};

export const useGeneralStore = () => _useGeneralStore((state) => state);
