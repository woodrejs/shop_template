import React, { useEffect, useState } from "react";
//COMPONENTS
import ProductInShop from "../components/ProductInShop";
import Basket from "../components/Basket";
//UTILES
import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function () {
      const resp = await getProducts();
      setProducts(resp);
    })();
  }, []);

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
        <div
          className="w-layout-grid grid"
          children={displayProducts(products)}
        />
      </div>
    </div>
  );
};

export default Shop;

async function getProducts() {
  const resp = await axios.post(`${process.env.REACT_APP_DB_HOST}/graphql`, {
    query: `{
              products{
                _id
                name
                unit_amount
                images{
                  url
                }                  
              }
            }`,
  });

  return resp.data.data.products;
}
function displayProducts(arr) {
  return arr.map((item) => <ProductInShop key={item._id} product={item} />);
}
