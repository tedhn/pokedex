import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  onClick,
  disabled = false,
  children,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer px-4 py-2 rounded transition-colors font-medium";
  
  const variants = {
    primary: "bg-slate-700 text-white hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed",
    secondary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
