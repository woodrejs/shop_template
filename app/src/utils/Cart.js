import { getStorage, setStorage } from "./Storage";

export function addToCart(e, item, clb) {
  e.preventDefault();

  const { id, unit_amount } = item;
  const data = getStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, true);
  let itemsArr = [];

  if (data) {
    // check if product is already in storage
    let index = isInArr(data, id);

    if (index === -1) {
      itemsArr = [...data, { id, quantity: 1, unit_amount }];
    } else {
      data[index].quantity++;
      itemsArr = data;
    }
  } else {
    itemsArr = [{ id, quantity: 1, unit_amount }];
  }

  //set in store
  clb(itemsArr);
}
export function removeFromCart(e, id, clb) {
  e.preventDefault();
  const data = getStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, true);

  if (data) {
    let itemsArr = [...data];

    // check if item is in storage
    let index = isInArr(data, id);

    if (index !== -1 && data[index].quantity > 1) {
      data[index].quantity--;
      itemsArr = data;
    } else if (index !== -1 && data[index].quantity === 1) {
      itemsArr = data.filter((item) => item.id !== id);
    }

    //set in store
    clb(itemsArr);
  }
}
export function removeItemFromCart(e, id, clb) {
  e.preventDefault();
  const data = getStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, true);

  if (data) {
    let itemsArr = [...data];

    // check if item is in storage
    let index = isInArr(data, id);

    if (index !== -1) {
      itemsArr = data.filter((item) => item.id !== id);
    }

    //set in store
    clb(itemsArr);
  }
}
export function getProductsInCart(cart, products) {
  let productsInCart = {};
  let productsToDisplay = [];

  cart.forEach(
    ({ id, quantity }) => (productsInCart[id] = { quantity, item: null })
  );

  products.forEach((item) => {
    if (productsInCart[item.id]) {
      productsInCart[item.id]["item"] = item;
    }
  });

  for (const item in productsInCart) {
    productsToDisplay.push(productsInCart[item]);
  }

  return productsToDisplay;
}
function isInArr(data, id) {
  return data ? data.findIndex((item) => item.id === id) : -1;
}
