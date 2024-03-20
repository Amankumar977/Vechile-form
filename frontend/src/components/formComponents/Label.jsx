import React from "react";

// Define a Label component
const Label = ({ htmlFor, className, label }) => {
  return (
    <div>
      {/* Label element */}
      <label htmlFor={htmlFor} className={className}>
        {label} {/* Text content of the label */}
      </label>
    </div>
  );
};

// Export the Label component as the default export
export default Label;
