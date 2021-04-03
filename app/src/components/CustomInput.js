import React from "react";
//UTILS
import { useCounter } from "../utils/Sweet_state";

const CustomInput = ({ data, isValid }) => {
  const { id, selector, name } = data;
  const [{ adress }, { setAdress }] = useCounter();

  const handleChange = (e) => {
    //set value in sweet_state
    const adressClone = { ...adress };
    adressClone[selector] = e.target.value;
    setAdress(adressClone);
  };

  return (
    <div key={id}>
      <label htmlFor={selector}>{name}</label>
      <input
        id={selector}
        type="text"
        onChange={(e) => handleChange(e)}
        value={adress[selector]}
      />
      {!isValid && <span>Wrong data</span>}
    </div>
  );
};
export default CustomInput;
