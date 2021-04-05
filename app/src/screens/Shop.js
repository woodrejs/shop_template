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
    <div class="mysection">
      <div class="mycontainer">
        <div class="menu">
          <div class="menu__cart">
            <Basket />
          </div>
        </div>
        <div class="title_box">
          <h1 class="title">Shop</h1>
        </div>
        <div class="w-layout-grid grid">{displayProducts()}</div>
      </div>
    </div>
  );
};

export default Shop;
