"use client";

import { useState } from "react";
import { InputProps } from "@/types";

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={props.id}
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          isFocused ? "ring-1 ring-blue-500" : ""
        } ${error ? "border-red-500" : ""} ${
          required ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;