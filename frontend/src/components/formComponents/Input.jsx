import React from "react";

const Input = React.forwardRef(({ handleChange, className, ...props }, ref) => {
  const handleChanges = (event) => {
    handleChange(event.target.value);
  };

  return (
    <div>
      <input
        ref={ref}
        onChange={handleChanges}
        className={`block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
