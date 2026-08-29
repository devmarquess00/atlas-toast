import React, { useEffect } from "react";
import "../styles/toast.css";
import { Toast } from "./Toast";
import type { ToastContainerProps } from "../types";
import { useToastStore } from "../stores/useToastStore";

export const ToastContainer: React.FC<ToastContainerProps> = ({
  duration = 3000,
  theme = "dark",
  position = "bottom-right",
  draggable = false, 
  closeOnClick = true,
  maxStacks = Infinity,
}) => {
  const toasts = useToastStore((state) => state.toasts);
  const setMaxStacks = useToastStore((state) => state.setMaxStacks);
  const hideToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    setMaxStacks(maxStacks);
  }, [maxStacks, setMaxStacks]);

  return (
    <div className="toast-container" data-position={position}>
      {toasts.map((toast) => (
        <Toast
          toast={toast}
          theme={theme}
          key={toast.id}
          duration={duration}
          draggable={draggable}
          hideToast={hideToast}
          closeOnClick={closeOnClick}
        />
      ))}
    </div>
  );
};