import { create } from "zustand";

export interface ToastStoreProps {
  id: string;
  title: string;
  description?: string;
  isExisting: boolean;
  statusToast?: "pending" | "resolved" | "error";
  type: "success" | "error" | "warning" | "info" | "promise";
}

interface ToastStore {
  toasts: ToastStoreProps[];
  addToast: (
    title: string,
    description: string,
    type?: ToastStoreProps["type"],
    statusToast?: ToastStoreProps['statusToast'],
  ) => string;
  updatedToast: (
    id: string,
    title: string, 
    description: string, 
    type?: ToastStoreProps["type"],
    statusToast?: ToastStoreProps['statusToast'],
  ) => void,
  removeToast: (id: string) => void;
  setToastIsExisting: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (title, description, type = "warning", statusToast = 'resolved') => {
    const id = Math.random().toString(36).substring(2, 9);
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

  updatedToast: (id, title, description, type = 'promise', statusToast) => {
    set((state) => ({
      toasts: state.toasts.map((toast) => toast.id === id ? { ...toast, title, description, type, statusToast } : toast)
    }))
  },

  setToastIsExisting(id) {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, isExisting: true } : toast,
      ),
    }));
  },

  removeToast: (id) => {
    console.log('chegou aqui')
    return set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  }
}));
