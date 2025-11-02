import { load } from '@tauri-apps/plugin-store';

export const savedRecordsStore = await load('saved-records.json');

export const settingsStore = await load('settings.json');
