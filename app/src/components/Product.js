import React from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { addToCart } from "../utils/Cart";

const Product = ({ product }) => {
  const { name, unit_amount, description, id, images } = product;
  const [__, { setCart }] = useCounter();

  //*add selected product to cart and sweet state
  const handleAddToCart = (e) => addToCart(e, product, setCart);

  return (
    <div>
      <div>{name}</div>
      <div>{unit_amount}</div>
      <div>{description}</div>
      <button onClick={(e) => handleAddToCart(e)}>Add Product</button>
    </div>
  );
};

export default Product;
