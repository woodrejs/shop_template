import React from "react";
//UTILES
import { addToCart } from "../utils/Cart";
import { useCounter } from "../utils/Sweet_state";
import { useQuery } from "@apollo/client";
import { getProductQuery } from "../utils/Queries";

const Product = () => {
  const [, { setCart }] = useCounter();
  const { loading, data } = useQuery(getProductQuery, {
    variables: {
      id: new URLSearchParams(window.location.search).get("_id"),
    },
  });

  const handleAddToCart = () => addToCart(data.product, setCart);

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div>
      {data.product.images.length && (
        <img
          src={data.product.images[0].url}
          alt="product_img"
          style={{ height: "300px" }}
        />
      )}
      <div>{data.product.name}</div>
      <div>{data.product.description}</div>
      <div>{data.product.unit_amount}</div>
      <button onClick={handleAddToCart}>add to cart</button>
    </div>
  );
};
export default Product;
