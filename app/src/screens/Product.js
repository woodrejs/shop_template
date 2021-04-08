import React, { useEffect, useState } from "react";
//UTILES
import axios from "axios";
import { addToCart } from "../utils/Cart";
import { useCounter } from "../utils/Sweet_state";

const Product = () => {
  const [, { setCart }] = useCounter();
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    description: "",
    unit_amount: "",
    images: [],
  });

  useEffect(async () => setProduct(await getProduct()), []);

  const handleAddToCart = () => addToCart(product, setCart);

  return (
    <div>
      {product.images.length && (
        <img
          src={product.images[0].url}
          alt="product_img"
          style={{ height: "300px" }}
        />
      )}
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.unit_amount}</div>
      <button onClick={handleAddToCart}>add to cart</button>
    </div>
  );
};
export default Product;

async function getProduct() {
  const id = new URLSearchParams(window.location.search).get("_id");
  const product = await axios.post(`${process.env.REACT_APP_DB_HOST}/graphql`, {
    query: `query($id: ID!){
                    product(id: $id){
                        _id
                        name
                        description
                        unit_amount
                        images{
                            url
                        }
                    }
                }`,
    variables: { id },
  });

  return product.data.data.product;
}
