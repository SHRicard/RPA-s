import { create } from 'zustand';

interface RefreshState {
    refreshKey: number;
    triggerRefresh: () => void;
}

export const useRefresh = create<RefreshState>((set) => ({
    refreshKey: 0,
    triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));