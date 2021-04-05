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
    const val = e.target.value;

    if (val >= 1) {
      val > quantity
        ? addToCart(product, setCart)
        : removeFromCart(_id, setCart);
      setProductQnty(val);
    }
  };

  return (
    <div class="productincart">
      {images.length && (
        <img src={images[0].url} class="image-2" alt="product_thumb" />
      )}
      <div class="productincart--content">
        <h4 class="productincart__title">{name}</h4>
        <h4 class="productincart__price">{unit_amount} PLN</h4>
        <input
          type="number"
          onChange={(e) => handleNumberInput(e)}
          value={productQnty}
        />
        <button
          class="button w-button"
          onClick={() => removeItemFromCart(_id, setCart)}
          children="Remove from Cart"
        />
      </div>
    </div>
  );
};
export default ProductInCart;
