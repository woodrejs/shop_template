import React from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { NavLink } from "react-router-dom";

const Basket = () => {
  const [{ cart }] = useCounter();

  return (
    <NavLink to="/cart">
      <span children="Cart: " />
      <span children={cart.length} />
    </NavLink>
  );
};
export default Basket;
