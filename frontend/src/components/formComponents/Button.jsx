import React from "react";

// Functional component for a button
const Button = ({ type, className, text, disable, ...props }) => {
  return (
    <div>
      {/* Button element */}
      <button
        type={type} // Type of button (e.g., "button", "submit")
        className={`flex cursor-pointer w-36 justify-center rounded-md border border-transparent bg-blue-400 hover:bg-blue-600 py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
        disabled={disable ? true : undefined} // Disable button if 'disable' prop is true
        {...props} // Spread any additional props passed to the component
      >
        {text} {/* Text content of the button */}
      </button>
    </div>
  );
};

// Exporting the Button component as the default export
export default Button;
