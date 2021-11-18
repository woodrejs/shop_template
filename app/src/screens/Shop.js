import React, { useState } from "react";
//COMPONENTS
import ProductInShop from "../components/ProductInShop";
import Basket from "../components/Basket";
import CategoriesForm from "../components/CategoriesForm";
//UTILES
import { useQuery } from "@apollo/client";
import { getProductsQuery } from "../utils/Queries";

const Shop = () => {
  const [limit, setLimit] = useState(6);
  const { loading, data } = useQuery(getProductsQuery, {
    variables: { limit },
  });

  const handleMoreProducts = () => setLimit(limit + 6);
  const handleDisplayProducts = () => {
    return loading
      ? "Loading ..."
      : data.products.map((item) => (
          <ProductInShop key={item._id} product={item} />
        ));
  };

  return (
    <div className="mysection">
      <div className="mycontainer">
        <div className="menu">
          <div className="menu__cart">
            <Basket />
          </div>
        </div>
        <div className="title_box">
          <h1 className="title">Shop</h1>
        </div>
        <CategoriesForm />
        <div
          className="w-layout-grid grid"
          children={handleDisplayProducts()}
        />
      </div>
      <div>
        <button onClick={handleMoreProducts}>more products</button>
      </div>
    </div>
  );
};

export default Shop;
