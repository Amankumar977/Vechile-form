import React from "react";

const Button = ({ type, className, text, disable, ...props }) => {
  return (
    <div>
      <button
        type={type}
        className={`flex cursor-pointer w-36 justify-center rounded-md border border-transparent bg-blue-400 hover:bg-blue-600 py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
        disabled={disable ? true : undefined}
        {...props}>
        {text}
      </button>
    </div>
  );
};

export default Button;
