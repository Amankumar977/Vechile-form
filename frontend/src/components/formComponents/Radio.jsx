import React from "react";

const Radio = React.forwardRef(({ name, id, value, ...rest }, ref) => {
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

export default Radio;
