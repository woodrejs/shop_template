import React, { useEffect } from "react";
//UTILES
import axios from "axios";

const Success = () => {
  const params = new URLSearchParams(window.location.search);
  const session_id = params.get("session_id");
  const jwt = params.get("jwt");
  const address = JSON.parse(
    sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_NAME)
  );

  useEffect(async () => {
    if (address) {
      const cart = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME)
      );

      const { data } = await axios(`${process.env.REACT_APP_DB_HOST}/products`);
      const orderList = getProductsInCart(cart, data);

      await axios.post(
        `${process.env.REACT_APP_DB_HOST}/orders`,
        {
          name: address.name,
          surname: address.surname,
          street: address.street,
          building: address.building,
          flat: address.flat,
          post_code: address.post_code,
          city: address.city,
          phone: address.phone,
          email: address.email,
          session_id: session_id,
          orderList: orderList,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    }
  }, []);

  return <div>Success</div>;
};

export default Success;

function getProductsInCart(arr1, arr2) {
  let productsInStorage = {};
  let productsInCart = [];

  arr1.forEach(
    ({ id, quantity }) => (productsInStorage[id] = { quantity, name: null })
  );

  arr2.forEach((item) => {
    if (productsInStorage[item.id]) {
      productsInStorage[item.id]["name"] = item.name;
    }
  });

  for (const item in productsInStorage) {
    productsInCart.push(productsInStorage[item]);
  }

  return productsInCart;
}
