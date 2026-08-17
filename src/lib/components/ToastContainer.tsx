import React from "react"
import "../styles/toast.css";
import { Toast } from "./Toast";
import type { ToastContainerProps } from "../types";
import { useToastStore } from "../stores/useToastStore";

export const ToastContainer: React.FC<ToastContainerProps> = ({
  theme = "light",
  position = "bottom-right",
  duration = 3000
}) => {
  const toasts = useToastStore((state) => state.toasts);
  const hideToast = useToastStore((state) => state.removeToast);
  const setToastIsExisting = useToastStore((state) => state.setToastIsExisting)

  return (
    <div className="toast-container" data-position={position}>
      {toasts.map((toast) => (
        <Toast
        toast={toast}
        theme={theme}
        key={toast.id}
        duration={duration}
        hideToast={hideToast}
        setToastIsExisting={setToastIsExisting}
        />
      ))}
    </div>
  );
};
