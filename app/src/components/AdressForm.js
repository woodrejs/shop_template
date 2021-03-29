import React, { useState } from "react";
import { useCounter } from "../utils/Sweet_state";
import { v4 as uuidv4 } from "uuid";

const INPUTS = [
  {
    name: "name",
    selector: "name",
    type: "text",
    id: uuidv4(),
  },
  {
    name: "surname",
    selector: "surname",
    type: "text",
    id: uuidv4(),
  },
  {
    name: "street",
    selector: "street",
    type: "text",
    id: uuidv4(),
  },
  {
    name: "building",
    selector: "building",
    type: "text",
    id: uuidv4(),
  },
  {
    name: "flat",
    selector: "flat",
    type: "text",
    id: uuidv4(),
  },
  {
    name: "city",
    selector: "city",
    type: "text",
    id: uuidv4(),
  },
  {
    name: "post code",
    selector: "post_code",
    type: "text",
    id: uuidv4(),
  },
  {
    name: "phone",
    selector: "phone",
    type: "number",
    id: uuidv4(),
  },
  {
    name: "email",
    selector: "email",
    type: "mail",
    id: uuidv4(),
  },
];

const AdressForm = () => {
  const [{ adress_store }, { setAdress_store }] = useCounter();

  const [adress, setAdress] = useState({
    name: adress_store.name || "",
    surname: adress_store.surname || "",
    street: adress_store.street || "",
    building: adress_store.building || "",
    flat: adress_store.flat || "",
    post_code: adress_store.post_code || "",
    city: adress_store.city || "",
    phone: adress_store.phone || "",
    email: adress_store.email || "",
  });

  const handleChange = (e, selector) => {
    const val = e.target.value;
    const store = { ...adress };
    store[selector] = val;
    setAdress(store);

    //set store in session
    sessionStorage.setItem(
      process.env.REACT_APP_SESSION_STORAGE_NAME,
      JSON.stringify(store)
    );

    setAdress_store(store);
  };

  return (
    <form>
      {INPUTS.map(({ name, type, id, selector }) => (
        <div key={id}>
          <label htmlFor={selector}>{name}</label>
          <input
            id={selector}
            type={type}
            onChange={(e) => handleChange(e, selector)}
            value={adress[selector]}
          />
        </div>
      ))}
    </form>
  );
};
export default AdressForm;
