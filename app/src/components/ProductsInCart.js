import React from "react";
//COMPONENTS
import ProductInCart from "./ProductInCart";
//UTILES
import { useCounter } from "../utils/Sweet_state";

const ProductsInCart = () => {
  const [{ cart }] = useCounter();

  return (
    <div className="w-layout-grid grid-2">
      {cart.map((item) => (
        <ProductInCart key={item._id} _id={item._id} quantity={item.quantity} />
      ))}
    </div>
  );
};
export default ProductsInCart;
