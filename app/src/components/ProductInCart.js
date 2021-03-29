import React, { useState } from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { addToCart, removeFromCart, removeItemFromCart } from "../utils/Cart";

const ProductInCart = ({ product, quantity }) => {
  const { name, unit_amount, description, id, images } = product;
  const [productQnty, setProductQnty] = useState(quantity);
  const [__, { setCart }] = useCounter();

  const handleNumberInput = (e) => {
    e.preventDefault();
    const val = e.target.value;

    if (val >= 1) {
      val > quantity
        ? addToCart(e, product, setCart)
        : removeFromCart(e, product.id, setCart);
      setProductQnty(val);
    }
  };
  const handleRemoveFromCart = (e) => removeItemFromCart(e, id, setCart);

  return (
    <div>
      <div>{name}</div>
      <div>{unit_amount}</div>
      <input
        type="number"
        onChange={(e) => handleNumberInput(e)}
        value={productQnty}
      />
      <button onClick={(e) => handleRemoveFromCart(e)}>
        Remove product from Cart
      </button>
    </div>
  );
};
export default ProductInCart;
