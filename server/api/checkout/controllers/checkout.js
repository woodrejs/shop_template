"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = {
  post: async ({ request, response }) => {
    const line_items = await getProducts(JSON.parse(request.body.items));
    const address = request.body.address;
    const orderList = JSON.stringify(
      line_items.map((item) => ({
        quantity: item.quantity,
        name: item.price_data.product_data.name,
      }))
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "p24"],
      line_items,
      mode: "payment",
      success_url: `${process.env.WEB_HOST}/success?success=true`,
      cancel_url: `${process.env.WEB_HOST}/failed?canceled=true`,
      metadata: {
        address,
        orderList,
      },
    });

    response.send({ id: session.id });
  },
};

async function getProducts(items) {
  const line_items = [];

  const data = await strapi.services.product.find();

  const productsInCart = getProductsInCart(items, data);

  productsInCart.forEach(({ item, quantity }) => {
    const { name, images, unit_amount } = item;

    line_items.push({
      price_data: {
        currency: "pln",
        product_data: {
          name,
          images: formatImages(images),
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
    if (productsInCart[item["_id"]]) {
      productsInCart[item["_id"]]["item"] = item;
    }
  });

  for (const item in productsInCart) {
    productsToDisplay.push(productsInCart[item]);
  }

  return productsToDisplay;
}
function formatImages(arr) {
  if (arr) {
    return arr.map((img) => img.formats.thumbnail.url);
  } else return [];
}
