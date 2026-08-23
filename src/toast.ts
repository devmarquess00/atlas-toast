import { useToastStore } from "./stores/useToastStore";

export const toast = {
  success: (title: string, description?: string) =>
    useToastStore.getState().addToast(title, description, "success"),
  error: (title: string, description?: string) =>
    useToastStore.getState().addToast(title, description, "error"),
  warning: (title: string, description?: string) =>
    useToastStore.getState().addToast(title, description, "warning"),
  info: (title: string, description?: string) =>
    useToastStore.getState().addToast(title, description, "info"),
  promise: async <T>(
    data: () => Promise<T>,
    options?: {
      pendingTitle?: string;
      pendingDescription?: string;
      resolvedTitle?: string;
      resolvedDescription?: string;
      errorTitle?: string;
      errorDescription?: string;
    },
  ) => {
    const { addToast, updatedToast } = useToastStore.getState();

    const id = addToast(
      options?.pendingTitle ?? "Carregando...",
      options?.pendingDescription ?? "Chamada está sendo processada!",
      "promise",
      "pending",
    );

    try {
      const result = await data();
      updatedToast(
        id,
        options?.resolvedTitle ?? "Sucesso!",
        options?.resolvedDescription ?? "Chamada resolvida com sucesso!",
        "promise",
        "resolved",
      );

      return result;
    } catch (err) {
      updatedToast(
        id,
        options?.errorTitle ?? "Erro!",
        options?.errorDescription ?? "Erro ao processar a chamada!",
        "promise",
        "error",
      );
      throw err;
    }
  },
};
