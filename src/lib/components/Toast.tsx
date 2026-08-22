import {
  LuCheck,
  LuInfo,
  LuLoaderCircle,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { type ToastStoreProps } from "../stores/useToastStore";

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

  const [translateX, setTranslateX] = useState(0);
  const [timing, setTiming] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const DESKTOP_DISMISS_THRESHOLD = 240;

  const startX = useRef(0);
  const isDraggingRef = useRef(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;

    isDraggingRef.current = true;
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = event.clientX - startX.current;

    setTranslateX(deltaX);

    const isMobile = window.innerWidth <= 640;

    if (isMobile) {
      const rect = event.currentTarget.getBoundingClientRect();

      const isOutRight = rect.left >= window.innerWidth;
      const isOutLeft = rect.right <= 0;

      if (isOutRight || isOutLeft) {
        hideToast(toast.id);
      }

      return;
    }

    const reachedThreshold = Math.abs(deltaX) >= DESKTOP_DISMISS_THRESHOLD;

    if (reachedThreshold) {
      hideToast(toast.id);
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const isMobile = window.innerWidth <= 640;

    isDraggingRef.current = false;
    setIsDragging(false);

    if (isMobile) {
      const rect = event.currentTarget.getBoundingClientRect();

      const isOutRight = rect.left >= window.innerWidth;
      const isOutLeft = rect.right <= 0;

      if (isOutRight || isOutLeft) {
        hideToast(toast.id);
        return;
      }

      setTranslateX(0);
      return;
    }

    const reachedThreshold = Math.abs(translateX) >= DESKTOP_DISMISS_THRESHOLD;

    if (reachedThreshold) {
      hideToast(toast.id);
      return;
    }

    setTranslateX(0);
  };

  useEffect(() => {
    if (toast.statusToast === "pending") return;
    const interval = setInterval(() => {
      if (isDraggingRef.current) return;

      setTiming((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [toast.id, toast.statusToast, intervalTime]);

  useEffect(() => {
    if (timing !== 0) return;

    setToastIsExisting(toast.id);
  }, [timing, toast.id, setToastIsExisting]);

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

  const promiseIcons = {
    pending: (
      <span className="toast-icon-promise">
        <LuLoaderCircle />
      </span>
    ),
    resolved: <LuCheck />,
    error: <LuX />,
  };

  return (
    <div
      className={`toast toast-${toast.type} ${
        toast.isExisting ? "is-existing" : ""
      }`}
      data-theme={theme}
      data-status={toast.statusToast}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        transform: `translateX(${translateX}px)`,
        transition: isDragging ? "none" : "transform 0.2s ease",
      }}
    >
      <div className="toast-icon">
        {toast.type === "promise"
          ? promiseIcons[toast.statusToast ?? "pending"]
          : icons[toast.type]}
      </div>

      <div className="content">
        <span className="content-title">{toast.title}</span>

        <span className="content-description">{toast.description}</span>
      </div>

      <button
        type="button"
        className="toast-close"
        aria-label="Close notification"
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        onClick={() => hideToast(toast.id)}
      >
        <LuX />
      </button>

      {toast.statusToast !== "pending" && (
        <div
          className="timing"
          style={{
            width: `${timing}%`,
          }}
        />
      )}
    </div>
  );
};
