import { create } from 'zustand';
import { settingsStore } from '../stores';
import { DisplayTheme } from '../types/settings-types';

interface SettingsState {
  displayTheme: DisplayTheme;
  setDisplayTheme: (displayTheme: DisplayTheme) => Promise<void>;
  initializeStore: () => Promise<void>;
}

const useSettingsStore = create<SettingsState>((set) => ({
  displayTheme: 'light',
  setDisplayTheme: async (displayTheme: DisplayTheme) => {
    set({ displayTheme });
    await settingsStore.set('displayTheme', displayTheme);
    await settingsStore.save();
  },
  initializeStore: async () => {
    const storedDisplayTheme = await settingsStore.get<DisplayTheme>(
      'displayTheme'
    );

    if (storedDisplayTheme) {
      set({ displayTheme: storedDisplayTheme });
    }
  },
}));

export default useSettingsStore;
