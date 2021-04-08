import { getStorage } from "./Storage";

export function addToCart(item, clb) {
  const { _id, unit_amount } = item;
  const data = getStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, true);
  let itemsArr = [];

  if (data) {
    // check if product is already in storage
    let index = isInArr(data, _id);

    if (index === -1) {
      itemsArr = [...data, { _id, quantity: 1, unit_amount }];
    } else {
      data[index].quantity++;
      itemsArr = data;
    }
  } else {
    itemsArr = [{ _id, quantity: 1, unit_amount }];
  }

  //set in store
  clb(itemsArr);
}
export function removeFromCart(id, clb) {
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
export function removeItemFromCart(id, clb) {
  const data = getStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, true);

  if (data) {
    let itemsArr = [...data];

    // check if item is in storage
    let index = isInArr(data, id);

    if (index !== -1) {
      itemsArr = data.filter((item) => item._id !== id);
    }

    //set in store
    clb(itemsArr);
  }
}
function isInArr(data, id) {
  return data ? data.findIndex((item) => item._id === id) : -1;
}
