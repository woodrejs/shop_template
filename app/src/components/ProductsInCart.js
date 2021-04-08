import React, { useState, useEffect } from "react";
//COMPONENTS
import ProductInCart from "./ProductInCart";
//UTILES
import axios from "axios";
import { useCounter } from "../utils/Sweet_state";

const ProductsInCart = () => {
  const [products, setProducts] = useState([]);
  const [{ cart }] = useCounter();

  useEffect(() => {
    (async () => {
      setProducts(await getProductsFromCart(cart));
    })();
  }, [cart]);

  return (
    <div className="w-layout-grid grid-2">
      {products.map((item) => (
        <ProductInCart key={item._id} product={item} />
      ))}
    </div>
  );
};
export default ProductsInCart;

async function getProductFromDB(id) {
  const product = await axios.post(`${process.env.REACT_APP_DB_HOST}/graphql`, {
    query: `query($id: ID!){
                      product(id: $id){
                          _id
                          name
                          images{
                            url
                          }
                      }
                  }`,
    variables: { id },
  });
  return product.data.data.product;
}
async function getProductsFromCart(arr) {
  return await Promise.all(
    arr.map((item) =>
      (async () => {
        const product = await getProductFromDB(item._id);
        return { ...item, ...product };
      })()
    )
  );
}
