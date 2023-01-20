import { RootState } from '../reducers';

export const isSavedPasswordLoading = (state: RootState) => state.passwords.isLoading;
export const totalSavedPasswords = (state: RootState) => state.passwords.totalResults;
export const allSavedPasswords = (state: RootState) => state.passwords.savedPasswords;