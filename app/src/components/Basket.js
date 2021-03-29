import React from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { Link } from "react-router-dom";

const Basket = () => {
  const [{ cart }, __] = useCounter();

  return (
    <Link to="/cart">
      <span>Cart </span>
      <span>{cart ? cart.length : 0}</span>
    </Link>
  );
};
export default Basket;
