import React from "react";
// react-hook-form 
export default function Input({
  label,
  icon,
  name,
  type = "text",
  placeholder = "",
  className = "",
  size = "md",
  rounded = "md",
  register,
  error,
  ...props
}) {
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={`flex border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          rounded-${rounded} overflow-hidden
          `}>
        <div className="bg-primary text-white flex items-center justify-center p-3">
          {icon}

        </div>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={` outline-none
         
          ${sizes[size]} 
          ${error ? "border-red-500 focus:ring-red-400" : ""}
          ${className}
        `}
          {...(register ? register(name) : {})}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-500">{error.message}</span>
        )}
      </div>

    </div>
  );
}
