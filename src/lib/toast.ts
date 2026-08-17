import { useToastStore } from "./stores/useToastStore"

export const toast = {
    success: (title: string, description: string) => useToastStore.getState().addToast(title, description, 'success'), 
    error: (title: string, description: string) => useToastStore.getState().addToast(title, description, 'error'),
    warning: (title: string, description: string) => useToastStore.getState().addToast(title, description, 'warning'),
    info: (title: string, description: string) => useToastStore.getState().addToast(title, description, 'info')
}