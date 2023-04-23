import { create } from "zustand";

type SimpleOpenCloseModal = {
  show: boolean;
  open: () => void;
  close: () => void;
};

type ModalBasedOnSomeId = {
  id: string | null;
  setId: (newId: string | null) => void;
};

export type GlobalModalsStates = {
  notificationsModal: SimpleOpenCloseModal;
  deletePostModal: ModalBasedOnSomeId;
  postLikesModal: ModalBasedOnSomeId;
  friendsModal: ModalBasedOnSomeId;
};

export const useGlobalModals = create<GlobalModalsStates>((set, get) => ({
  /**
   * Modal do pokazywania wszystkich powiadomień użytkownika
   */
  notificationsModal: {
    show: false,
    open: () => set({ notificationsModal: { ...get().notificationsModal, show: true } }),
    close: () => set({ notificationsModal: { ...get().notificationsModal, show: false } }),
  },

  /**
   * Modal do usuwania postu na podstawie id
   */
  deletePostModal: {
    id: null,
    setId: (id) => set({ deletePostModal: { ...get().deletePostModal, id } }),
  },

  /**
   * Modal do pokazywania nieskończonej listy polubień postu na podstawie id
   */
  postLikesModal: {
    id: null,
    setId: (id) => set({ postLikesModal: { ...get().postLikesModal, id } }),
  },

  /**
   * Modal do pokazywania nieskończonej listy polubień postu na podstawie id
   */
  friendsModal: {
    id: null,
    setId: (id) => set({ friendsModal: { ...get().friendsModal, id } }),
  },
}));
