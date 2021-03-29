"use strict";

const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = {
  post: async ({ request, response }) => {
    const line_items = await getProducts(JSON.parse(request.body.items));
    const jwt = await userAuth();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "p24"],
      line_items,
      mode: "payment",
      success_url: `${process.env.WEB_HOST}/success?success=true&jwt=${jwt}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEB_HOST}/failed?canceled=true`,
    });

    response.send({ id: session.id });
  },
};

async function getProducts(items) {
  const line_items = [];
  const { data } = await axios.get(`${process.env.DB_HOST}/products`);

  const productsInCart = getProductsInCart(items, data);

  productsInCart.forEach(({ item, quantity }) => {
    const { name, images, unit_amount } = item;
    line_items.push({
      price_data: {
        currency: "pln",
        product_data: {
          name,
          images,
        },
        unit_amount,
      },
      quantity,
    });
  });

  return line_items;
}
function getProductsInCart(cart, products) {
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
async function userAuth() {
  const { data } = await axios.post(`${process.env.DB_HOST}/auth/local`, {
    identifier: "test@test.pl",
    password: "Test1234",
  });
  return data.jwt;
}