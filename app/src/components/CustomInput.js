import React from "react";

const CustomInput = ({ name, handler, id }) => {
  return (
    <div style={{ display: "flex" }}>
      <input type="checkbox" name={name} onChange={handler} value={id} />
      <label htmlFor="">{name}</label>
    </div>
  );
};
export default CustomInput;
