import React from "react";

// Define a Radio component using React.forwardRef
const Radio = React.forwardRef(({ name, id, value, ...rest }, ref) => {
  return (
    <div>
      {/* Radio button input element */}
      <input
        type="radio"
        name={name} // Name attribute for grouping radio buttons
        id={id} // ID attribute for associating the label with the input
        value={value} // Value of the radio button
        ref={ref} // Forwarding ref to the input element
        {...rest} // Spread any additional props passed to the component
      />
    </div>
  );
});

// Export the Radio component as the default export
export default Radio;
