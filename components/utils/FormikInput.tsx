"use client";

import { FieldProps as FormikFieldProps } from "formik";
import { InputProps } from "@/types";
import { useState } from "react";

interface FieldProps extends FormikFieldProps, InputProps {
  error?: string | null;
}

const FormikInput: React.FC<FieldProps> = ({
  field,
  form,
  label,
  placeholder,
  error,
  required = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={props.type || "text"}
        id={field.name}
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          isFocused ? "ring-1 ring-blue-500" : ""
        } ${error ? "border-red-500" : ""} ${
          required ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        value={field.value}
        onChange={field.onChange}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormikInput;