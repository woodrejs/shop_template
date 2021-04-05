import React from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { addToCart } from "../utils/Cart";

const Product = ({ product }) => {
  const { name, unit_amount, images } = product;
  const [, { setCart }] = useCounter();

  //*add selected product to cart and sweet state
  const handleAddToCart = () => addToCart(product, setCart);

  return (
    <div
      id="w-node-_7b61a85c-08ba-878d-f4aa-b0b1e6dd3eea-a53abb1b"
      class="product"
    >
      {images.length && (
        <img
          src={images[0].url}
          alt="product_thumb"
          loading="lazy"
          class="image"
        />
      )}
      <div class="product__content">
        <h4 class="product__title">{name}</h4>
        <h4 class="product__price">{unit_amount}</h4>
        <button
          class="w-button"
          children="Add to cart"
          onClick={(e) => handleAddToCart(e)}
        />
      </div>
    </div>
  );
};

export default Product;
