import React from "react";
import "../styles/toast.css";
import { useToastStore } from "../stores/useToastStore";
import { LuCheck, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";
import type { ToastContainerProps } from "../types";

export const ToastContainer: React.FC<ToastContainerProps> = ({
  theme = "light",
  position = "bottom-right",
}) => {
  const toasts = useToastStore((state) => state.toasts);
  const hideToast = useToastStore((state) => state.removeToast);

  const icons = {
    success: <LuCheck />,
    warning: <LuTriangleAlert />,
    error: <LuX />,
    info: <LuInfo />,
  };

  return (
    <div className="toast-container" data-position={position}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type} ${
            toast.isExisting ? "is-existing" : ""
          }`}
          data-theme={theme}
        >
          <div className="toast-icon">{icons[toast.type]}</div>

          <div className="content">
            <span className="content-title">{toast.title}</span>

            <span className="content-description">{toast.description}</span>
          </div>

          <button
            type="button"
            className="toast-close"
            aria-label="Close notification"
            onClick={() => hideToast(toast.id)}
          >
            <LuX />
          </button>
        </div>
      ))}
    </div>
  );
};
