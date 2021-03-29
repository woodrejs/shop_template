function isInArr(data, id) {
  return data ? data.findIndex((item) => item.id === id) : -1;
}

export function addToCart(e, item, clb) {
  e.preventDefault();

  let itemsArr = [];
  const { id, unit_amount } = item;
  const storage_name = process.env.REACT_APP_LOCAL_STORAGE_NAME;
  const local_storage = localStorage.getItem(storage_name);

  if (local_storage) {
    // check if product is already in storage
    const data = JSON.parse(local_storage);
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

  //set in storage
  localStorage.setItem(storage_name, JSON.stringify(itemsArr));
  //set in store
  clb(itemsArr);
}
export function removeFromCart(e, id, clb) {
  e.preventDefault();

  const storage_name = process.env.REACT_APP_LOCAL_STORAGE_NAME;
  const items = localStorage.getItem(storage_name);

  if (items) {
    const data = JSON.parse(items);
    let itemsArr = [...data];

    // check if item is in storage
    let index = isInArr(data, id);

    if (index !== -1 && data[index].quantity > 1) {
      data[index].quantity--;
      itemsArr = data;
    } else if (index !== -1 && data[index].quantity === 1) {
      itemsArr = data.filter((item) => item.id !== id);
    }

    //set cart items in storage
    localStorage.setItem(storage_name, JSON.stringify(itemsArr));
    //set in store
    clb(itemsArr);
  }
}
export function removeItemFromCart(e, id, clb) {
  e.preventDefault();

  const storage_name = process.env.REACT_APP_LOCAL_STORAGE_NAME;
  const items = localStorage.getItem(storage_name);

  if (items) {
    const data = JSON.parse(items);
    let itemsArr = [...data];

    // check if item is in storage
    let index = isInArr(data, id);

    if (index !== -1) {
      itemsArr = data.filter((item) => item.id !== id);
    }

    //set cart items in storage
    localStorage.setItem(storage_name, JSON.stringify(itemsArr));
    //set in store
    clb(itemsArr);
  }
}
export function clearCart(e, clb) {
  e.preventDefault();
  const storage_name = process.env.REACT_APP_LOCAL_STORAGE_NAME;
  //remove from storage
  localStorage.removeItem(storage_name);
  //remove from store
  clb();
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
