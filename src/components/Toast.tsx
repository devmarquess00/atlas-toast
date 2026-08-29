import { LuX } from "react-icons/lu";
import { useToast } from "../hooks/useToast";
import { iconsToastNormal, iconsToastPromise } from "../constants";
import type { ToastProps } from "../types";

export const Toast = ({
  toast,
  theme,
  duration,
  hideToast,
  closeOnClick,
  draggable,
}: ToastProps) => {
  const {
    timing,
    isDragging,
    translateX,
    handlePointerUp,
    handlePointerDown,
    handlePointerMove,
  } = useToast({ duration, hideToast, toast });

  return (
    <div
      className={`toast toast-${toast.type} ${
        toast.isExisting ? "is-existing" : ""
      }`}
      data-theme={theme}
      data-status={toast.statusToast}
      data-draggable={draggable}
      onPointerDown={draggable ? handlePointerDown : undefined}
      onPointerMove={draggable ? handlePointerMove : undefined}
      onPointerUp={draggable ? handlePointerUp : undefined}
      onPointerCancel={draggable ? handlePointerUp : undefined}
      style={{
        transform: `translateX(${translateX}px)`,
        transition: isDragging ? "none" : "transform 0.2s ease",
      }}
    >
      <div className="toast-icon">
        {toast.type === "promise"
          ? iconsToastPromise[toast.statusToast ?? "pending"]
          : iconsToastNormal[toast.type]}
      </div>

      <div className="content">
        <span className="content-title">{toast.title}</span>

        <span className="content-description">{toast.description}</span>
      </div>

      {closeOnClick && (
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
      )}

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
