import { useEffect, useRef, useState } from "react";
import { useToastStore, type ToastStoreProps } from "../stores/useToastStore";

type useToastProps = {
  toast: ToastStoreProps;
  duration: number;
  hideToast: (id: string) => void;
};

const useToast = (props: useToastProps) => {
  const { setToastIsExisting } = useToastStore();

  const intervalTime = props.duration / 100;
  const DESKTOP_DISMISS_THRESHOLD = 240;

  const [translateX, setTranslateX] = useState(0);
  const [timing, setTiming] = useState(100);
  const [isDragging, setIsDragging] = useState(false);

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
        props.hideToast(props.toast.id);
      }

      return;
    }

    const reachedThreshold = Math.abs(deltaX) >= DESKTOP_DISMISS_THRESHOLD;

    if (reachedThreshold) {
      props.hideToast(props.toast.id);
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
        props.hideToast(props.toast.id);
        return;
      }

      setTranslateX(0);
      return;
    }

    const reachedThreshold = Math.abs(translateX) >= DESKTOP_DISMISS_THRESHOLD;

    if (reachedThreshold) {
      props.hideToast(props.toast.id);
      return;
    }

    setTranslateX(0);
  };

  useEffect(() => {
    if (props.toast.statusToast === "pending") return;
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
  }, [props.toast.id, props.toast.statusToast, intervalTime]);

  useEffect(() => {
    if (timing !== 0) return;

    setToastIsExisting(props.toast.id);
  }, [timing, props.toast.id, setToastIsExisting]);

  useEffect(() => {
    if (!props.toast.isExisting) return;

    const timeout = setTimeout(() => {
      props.hideToast(props.toast.id);
    }, 300);

    return () => clearTimeout(timeout);
  }, [props.toast.isExisting, props.toast.id, props.hideToast]);

  return {
    timing,
    translateX,
    isDragging,
    handlePointerUp,
    handlePointerDown,
    handlePointerMove,
  };
};

export { useToast };
