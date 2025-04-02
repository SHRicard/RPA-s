import { create } from 'zustand';

interface OffcanvasState {
    visible: boolean;
    openCanvas: () => void;
    closeCanvas: () => void;
}

export const useOffcanvasStore = create<OffcanvasState>((set) => ({
    visible: false,
    openCanvas: () => {
        set({ visible: true }); // Establece el estado como true para abrir el offcanvas
    },
    closeCanvas: () => {
        set({ visible: false }); // Establece el estado como false para cerrar el offcanvas
    },
}));
