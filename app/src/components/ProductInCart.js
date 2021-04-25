import React, { useState } from "react";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { addToCart, removeFromCart, removeItemFromCart } from "../utils/Cart";
import { useQuery } from "@apollo/client";
import { getProductInCartQuery } from "../utils/Queries";

const ProductInCart = ({ _id, quantity }) => {
  const [qnty, setQnty] = useState(quantity);
  const [, { setCart }] = useCounter();
  const { loading, data } = useQuery(getProductInCartQuery, {
    variables: { id: _id },
  });

  const handleNumberInput = (e) => {
    const val = e.target.value;

    if (val >= 1) {
      val > quantity
        ? addToCart(data.product, setCart)
        : removeFromCart(_id, setCart);
      setQnty(val);
    }
  };

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div className="productincart">
      {data.product.images.length && (
        <img
          src={data.product.images[0].url}
          className="image-2"
          alt="product_thumb"
        />
      )}
      <div className="productincart--content">
        <h4 className="productincart__title">{data.product.name}</h4>
        <h4 className="productincart__price">{data.product.unit_amount} PLN</h4>
        <input
          type="number"
          onChange={(e) => handleNumberInput(e)}
          value={qnty}
        />
        <button
          className="button w-button"
          onClick={() => removeItemFromCart(_id, setCart)}
          children="Remove from Cart"
        />
      </div>
    </div>
  );
};
export default ProductInCart;
