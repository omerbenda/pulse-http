import { create } from 'zustand';
import { InterfaceType } from '../types/api-interface-types';

interface InterfaceState {
  interfaceType: InterfaceType;
  setInterfaceType: (interfaceType: InterfaceType) => void;
}

const useInterfaceStore = create<InterfaceState>((set) => ({
  interfaceType: InterfaceType.HTTP,
  setInterfaceType: (newType: InterfaceType) => set({ interfaceType: newType }),
}));

export default useInterfaceStore;
