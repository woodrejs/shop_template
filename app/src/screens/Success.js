import React, { useEffect } from "react";
//UTILES
import axios from "axios";
import { getStorage } from "../utils/Storage";

const Success = () => {
  useEffect(async () => setOrderInStrapi(), []);

  return <div>Success</div>;
};

export default Success;
async function setOrderInStrapi() {
  const address = getStorage(process.env.REACT_APP_SESSION_STORAGE_NAME, false);
  const params = new URLSearchParams(window.location.search);

  if (address) {
    const { data: products } = await axios(
      `${process.env.REACT_APP_DB_HOST}/products`
    );

    const path = `${process.env.REACT_APP_DB_HOST}/orders`;

    const data = { ...address };
    data["orderList"] = getProductsInCart(products);
    data["session_id"] = params.get("session_id");

    const options = {
      headers: {
        Authorization: `Bearer ${params.get("jwt")}`,
      },
    };

    //set order in DB
    await axios.post(path, data, options);
  }
}
function getProductsInCart(arr) {
  const cart = getStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, true);
  let productsInStorage = {};
  let productsInCart = [];

  cart.forEach(
    ({ id, quantity }) => (productsInStorage[id] = { quantity, name: null })
  );

  arr.forEach((item) => {
    if (productsInStorage[item.id]) {
      productsInStorage[item.id]["name"] = item.name;
    }
  });

  for (const item in productsInStorage) {
    productsInCart.push(productsInStorage[item]);
  }

  return productsInCart;
}
