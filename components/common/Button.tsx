"use client";

import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className,
  ...props
}) => {
  const buttonClasses =
    `bg-${variant}-500 hover:bg-${variant}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline` +
    (disabled ? " opacity-50 cursor-not-allowed" : "") +
    (className ? ` ${className}` : "");

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;