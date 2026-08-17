import { LuCheck, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import type { ToastStoreProps } from "../stores/useToastStore";

export type ToastProps = {
  duration: number;
  toast: ToastStoreProps;
  theme: "light" | "dark";
  hideToast: (id: string) => void;
  setToastIsExisting: (id: string) => void;
};

export const Toast = ({
  toast,
  theme,
  duration,
  hideToast,
  setToastIsExisting,
}: ToastProps) => {
  const intervalTime = duration / 100;
  const [timing, setTiming] = useState<number>(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiming((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setToastIsExisting(toast.id);

          return 0;
        }

        return prev - 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [toast.id]);

  useEffect(() => {
    if (!toast.isExisting) return;
    const timeout = setTimeout(() => {
      hideToast(toast.id);
    }, 300);

    return () => clearTimeout(timeout);
  }, [toast.isExisting, toast.id, hideToast]);

  const icons = {
    success: <LuCheck />,
    warning: <LuTriangleAlert />,
    error: <LuX />,
    info: <LuInfo />,
  };

  return (
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

      <div
        className="timing"
        style={{
          width: `${timing}%`,
        }}
      />
    </div>
  );
};
