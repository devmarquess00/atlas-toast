import { Toast } from "./Toast";
import type { ToastProps } from "../types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const defaultToast: ToastProps["toast"] = {
  id: "1",
  isExisting: false,
  title: "Toast Sucesso",
  description: "Descrição toast de sucesso",
  type: "success",
  statusToast: "resolved",
};

const meta: Meta<ToastProps> = {    
  title: "Toast",
  component: Toast,
  args: {
    duration: 3000,
    theme: "light",
    hideToast: (id: string) => console.log(`Toast ${id} fechado`),
    toast: defaultToast,
  },
};

export const ToastSuccess: StoryObj = {
  args: {
    toast: {
      ...defaultToast,
      type: "success",
      title: "Título de sucesso",
    },
  },
};

export const ToastWarning: StoryObj = {
  args: {
    toast: {
      ...defaultToast,
      type: "warning",
      title: "Toast de alerta",
      description: "Descrição toast de alerta",
    },
  },
};

export const ToastInfo: StoryObj = {
  args: {
    toast: {
      ...defaultToast,
      type: "info",
      title: "Toast de info",
      description: "Descrição toast de info",
    },
  },
};

export const ToastError: StoryObj = {
  args: {
    toast: {
      ...defaultToast,
      type: "error",
      title: "Toast de error",
      description: "Descrição toast de erro",
    },
  },
};

export default meta;
