import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl select-none";

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-7 py-3.5 text-base gap-2.5 font-semibold",
    };

    const variants = {
      primary:
        "bg-orange text-bg font-semibold shadow-none hover:bg-orange-dim hover:shadow-glow-orange",
      secondary:
        "bg-surface-raised/80 text-beige border border-outline hover:border-outline-strong hover:bg-surface-hover backdrop-blur-md",
      outline:
        "bg-transparent text-beige border border-outline-strong hover:border-orange hover:text-orange hover:bg-orange/5",
      ghost:
        "bg-transparent text-beige-dim hover:text-beige hover:bg-surface-raised/50",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
