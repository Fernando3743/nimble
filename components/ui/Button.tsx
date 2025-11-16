import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-black text-white hover:bg-dark disabled:hover:bg-black",
      secondary: "bg-light-gray text-black hover:bg-zinc-200 disabled:hover:bg-light-gray",
      outline: "border border-zinc-300 bg-white text-black hover:bg-light-gray disabled:hover:bg-white",
      ghost: "bg-transparent text-black hover:bg-light-gray disabled:hover:bg-transparent",
      danger: "bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-[15px]",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          loading && "relative",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
        <span className={loading ? "invisible" : ""}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";