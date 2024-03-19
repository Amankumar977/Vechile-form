import React from "react";

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div>
      <input
        ref={ref}
        className={`block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
