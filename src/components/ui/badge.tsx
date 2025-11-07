import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const base =
    "inline-flex items-center px-2 py-1 rounded-md text-sm font-medium";
  const variants: Record<string, string> = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-muted text-muted-foreground",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
