import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, required, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1">
        <label
          htmlFor={fieldId}
          className="block text-sm font-semibold text-dark"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <input
          ref={ref}
          id={fieldId}
          className={cn(
            "w-full rounded-lg border px-3 py-2.5 text-[15px] text-dark transition-colors",
            "placeholder:text-dark-gray focus:outline-none focus:ring-2",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : "border-zinc-300 focus:border-black focus:ring-black/10",
            props.disabled && "bg-light-gray cursor-not-allowed opacity-60",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${fieldId}-helper`} className="text-sm text-dark-gray">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";