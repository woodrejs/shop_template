import React from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { addToCart } from "../utils/Cart";

const Product = ({ product }) => {
  const { name, unit_amount, images } = product;
  const [, { setCart }] = useCounter();

  //*add selected product to cart and sweet state
  const handleAddToCart = (e) => addToCart(e, product, setCart);

  return (
    <div>
      {images.length && (
        <img
          src={images[0].url}
          alt="product_thumb"
          style={{ height: "15vw" }}
        />
      )}
      <div>{name}</div>
      <div>{unit_amount}</div>

      <button onClick={(e) => handleAddToCart(e)}>Add Product</button>
    </div>
  );
};

export default Product;
