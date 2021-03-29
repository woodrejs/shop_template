import React from "react";
//COMPONENTS
import Product from "../components/Product";
import Basket from "../components/Basket";
//UTILES
import { useCounter } from "../utils/Sweet_state";

const Shop = () => {
  const [{ products }, __] = useCounter();

  return (
    <div>
      <Basket />
      <hr />
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
