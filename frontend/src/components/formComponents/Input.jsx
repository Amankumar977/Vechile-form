import React from "react";

// Define an Input component using React.forwardRef
const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div>
      {/* Input element */}
      <input
        ref={ref} // Forwarding ref to the input element
        className={`block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className}`}
        {...props} // Spread any additional props passed to the component
      />
    </div>
  );
});

// Export the Input component as the default export
export default Input;
