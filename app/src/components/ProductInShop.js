import React from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { addToCart } from "../utils/Cart";
import { Link } from "react-router-dom";

const ProductInShop = ({ product }) => {
  const { _id, name, unit_amount, images } = product;
  const [, { setCart }] = useCounter();

  //*add selected product to cart and sweet state
  const handleAddToCart = () => addToCart(product, setCart);

  return (
    <div
      id="w-node-_7b61a85c-08ba-878d-f4aa-b0b1e6dd3eea-a53abb1b"
      className="product"
    >
      <Link to={`/product/?_id=${_id}`}>
        {images.length && (
          <img
            src={images[0].url}
            alt="product_thumb"
            loading="lazy"
            className="image"
          />
        )}
      </Link>
      <div className="product__content">
        <h4 className="product__title">{name}</h4>
        <h4 className="product__price">{unit_amount}</h4>
        <button
          className="w-button"
          children="Add to cart"
          onClick={(e) => handleAddToCart(e)}
        />
      </div>
    </div>
  );
};

export default ProductInShop;
