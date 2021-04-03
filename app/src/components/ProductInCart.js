import React, { useState } from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { addToCart, removeFromCart, removeItemFromCart } from "../utils/Cart";

const ProductInCart = ({ product, quantity }) => {
  const { name, unit_amount, _id, images } = product;
  const [productQnty, setProductQnty] = useState(quantity);
  //sweet_state
  const [, { setCart }] = useCounter();

  const handleNumberInput = (e) => {
    e.preventDefault();
    const val = e.target.value;

    if (val >= 1) {
      val > quantity
        ? addToCart(e, product, setCart)
        : removeFromCart(e, _id, setCart);
      setProductQnty(val);
    }
  };

  return (
    <div>
      {images.length && (
        <img
          src={images[0].url}
          alt="product_thumb"
          style={{ height: "5vw" }}
        />
      )}
      <div>{name}</div>
      <div>{unit_amount}</div>
      <input
        type="number"
        onChange={(e) => handleNumberInput(e)}
        value={productQnty}
      />
      <button onClick={(e) => removeItemFromCart(e, _id, setCart)}>
        Remove product from Cart
      </button>
    </div>
  );
};
export default ProductInCart;
