import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "orange" | "outline" | "code" | "pill";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 font-medium transition-colors select-none";

  const variants = {
    default:
      "px-2.5 py-1 text-xs bg-[#1D1712] text-[#B8AC96] border border-[#E8DCC8]/15",
    orange:
      "px-2.5 py-1 text-xs bg-[#FF7A30]/10 text-[#FF7A30] border border-[#FF7A30]/30 font-medium font-mono",
    outline:
      "px-2.5 py-0.5 text-xs text-[#B8AC96] border border-[#E8DCC8]/15 hover:border-[#FF7A30]/30",
    code: "px-2 py-0.5 font-mono text-xs bg-[#14100C] text-[#B8AC96] border border-[#E8DCC8]/20",
    pill: "px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold font-mono bg-[#1D1712] text-[#FF7A30] border border-[#FF7A30]/20",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
