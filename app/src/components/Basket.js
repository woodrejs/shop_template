import React from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { Link } from "react-router-dom";

const Basket = () => {
  const [{ cart }] = useCounter();

  return (
    <Link to="/cart">
      <span children="Cart: " />
      <span children={cart.length} />
    </Link>
  );
};
export default Basket;
