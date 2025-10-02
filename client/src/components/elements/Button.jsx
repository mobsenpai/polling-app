import React from 'react';

export default function Button({ className, type, onClick, text, secondary, fullwidth, loading }) {
  const variants = {
    primary: "px-8 py-3 text-sm text-white cursor-pointer rounded-md bg-primary hover:bg-primary-hover flex items-center justify-center gap-2",
    secondary: "px-8 py-3 text-primary text-sm cursor-pointer bg-white rounded-md border border-primary hover:text-white hover:bg-primary flex items-center justify-center gap-2"
  };

  return (
    <button
      type={!type ? "button" : type}
      className={`${secondary ? variants.secondary : variants.primary} ${className} ${fullwidth}`}
      onClick={onClick}
      disabled={loading} // disable button while loading
    >
      {loading && (
        <div
          className={`border-2 border-t-2 border-t-transparent rounded-full w-4 h-4 animate-spin ${secondary ? 'border-primary' : 'border-white'}`}
        ></div>
      )}
      {text}
    </button>
  );
}
