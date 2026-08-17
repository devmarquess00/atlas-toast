import { create } from "zustand";

export interface ToastStoreProps {
  id: string;
  title: string;
  description?: string;
  isExisting: boolean;
  type: "success" | "error" | "warning" | "info";
}

interface ToastStore {
  toasts: ToastStoreProps[];
  addToast: (
    title: string,
    description: string,
    type?: ToastStoreProps["type"],
  ) => void;
  removeToast: (id: string) => void;
  setToastIsExisting: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (title, description, type = "warning") => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id, title, description, type, isExisting: false },
      ],
    }));
  },

  setToastIsExisting(id) {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, isExisting: true } : toast,
      ),
    }));
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
