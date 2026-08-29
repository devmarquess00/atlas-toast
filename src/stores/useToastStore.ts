import { create } from "zustand";
import type { ToastStoreProps } from "../types";

interface ToastStore {
  toasts: ToastStoreProps[];
  maxStacks: number;
  setMaxStacks: (maxStacks: number) => void;
  addToast: (
    title: string,
    description?: string,
    type?: ToastStoreProps["type"],
    statusToast?: ToastStoreProps["statusToast"],
  ) => string | null;
  updatedToast: (
    id: string,
    title: string,
    description: string,
    type?: ToastStoreProps["type"],
    statusToast?: ToastStoreProps["statusToast"],
  ) => void;
  removeToast: (id: string) => void;
  setToastIsExisting: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  maxStacks: Infinity,
  setMaxStacks: (maxStacks) => set({ maxStacks }),
  addToast: (
    title,
    description,
    type = "warning",
    statusToast = "resolved",
  ) => {
    const { toasts, maxStacks } = get();
    if (toasts.length >= maxStacks) return null;

    const id = crypto.randomUUID();
    const creatingToast =
      type === "promise"
        ? {
            id,
            title,
            description,
            statusToast: statusToast,
            type,
            isExisting: false,
          }
        : {
            id,
            title,
            description,
            statusToast: statusToast,
            isExisting: false,
            type,
          };

    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: creatingToast.id,
          title: creatingToast.title,
          description: creatingToast.description,
          type: creatingToast.type,
          isExisting: creatingToast.isExisting,
          statusToast: creatingToast.statusToast,
        },
      ],
    }));

    return id;
  },

  updatedToast: (id, title, description, type = "promise", statusToast) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id
          ? { ...toast, title, description, type, statusToast }
          : toast,
      ),
    }));
  },

  setToastIsExisting(id) {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, isExisting: true } : toast,
      ),
    }));
  },

  removeToast: (id) => {
    return set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));