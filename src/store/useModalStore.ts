import { create } from 'zustand';

interface ModalState {
  modals: {
    'sign-in': boolean;
    'sign-up': boolean;
    'reset-password': boolean;
    settings: boolean;
  };
  openModal: (modal: keyof ModalState['modals']) => void;
  closeModal: (modal: keyof ModalState['modals']) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modals: {
    'sign-in': false,
    'sign-up': false,
    'reset-password': false,
    settings: false,
  },
  openModal: (modal) =>
    set((state) => ({ modals: { ...state.modals, [modal]: true } })),
  closeModal: (modal) =>
    set((state) => ({ modals: { ...state.modals, [modal]: false } })),
}));

export default useModalStore;
