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
};