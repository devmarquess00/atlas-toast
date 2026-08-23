export type ToastPositionProps =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export type ToastContainerProps = {
  theme?: "light" | "dark";
  position?: ToastPositionProps;
  duration?: number;
};

export interface ToastStoreProps {
  id: string;
  title: string;
  description?: string;
  isExisting: boolean;
  statusToast?: "pending" | "resolved" | "error";
  type: "success" | "error" | "warning" | "info" | "promise";
}

export type ToastProps = {
  duration: number;
  toast: ToastStoreProps;
  theme: "light" | "dark";
  hideToast: (id: string) => void;
};
