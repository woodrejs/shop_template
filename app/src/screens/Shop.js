import React from "react";
//COMPONENTS
import Product from "../components/Product";
import Basket from "../components/Basket";
//UTILES
import { useCounter } from "../utils/Sweet_state";

const Shop = () => {
  const [{ products }] = useCounter();

  const displayProducts = () =>
    products.map((product) => <Product key={product._id} product={product} />);

  return (
    <div>
      <Basket />
      <hr />
      {displayProducts()}
    </div>
  );
};

export default Shop;
