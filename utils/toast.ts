import { toast, type ToastOptions } from "react-toastify";

// Default toast options
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Success toast
export const showSuccess = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    ...defaultOptions,
    ...options,
  });
};

// Error toast
export const showError = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    ...defaultOptions,
    ...options,
    autoClose: 5000, // Errors stay a bit longer
  });
};

// Info toast
export const showInfo = (message: string, options?: ToastOptions) => {
  return toast.info(message, {
    ...defaultOptions,
    ...options,
  });
};

// Warning toast
export const showWarning = (message: string, options?: ToastOptions) => {
  return toast.warning(message, {
    ...defaultOptions,
    ...options,
  });
};

// Loading toast (returns a toast ID that can be updated)
export const showLoading = (message: string = "Loading...", options?: ToastOptions) => {
  return toast.loading(message, {
    ...defaultOptions,
    ...options,
    autoClose: false, // Loading toasts don't auto-close
  });
};

// Update an existing toast
export const updateToast = (
  toastId: string | number,
  type: "success" | "error" | "info" | "warning",
  message: string,
  options?: ToastOptions
) => {
  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    ...defaultOptions,
    ...options,
  });
};

// Promise-based toast (great for async operations)
export const toastPromise = <T = any>(
  promise: Promise<T>,
  messages: {
    pending: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
  options?: ToastOptions
) => {
  return toast.promise(
    promise,
    {
      pending: messages.pending,
      success: messages.success,
      error: messages.error,
    },
    {
      ...defaultOptions,
      ...options,
    }
  );
};

// Dismiss a specific toast or all toasts
export const dismissToast = (toastId?: string | number) => {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss(); // Dismisses all toasts
  }
};

// Check if a toast is active
export const isToastActive = (toastId: string | number) => {
  return toast.isActive(toastId);
};