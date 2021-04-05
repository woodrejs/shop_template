"use strict";

//need to set  webhood in stripe dashboard

module.exports = {
  post: async ({ request, response }) => {
    const event = request.body;

    // Handle the event
    switch (event.type) {
      case "payment_intent.payment_failed":
        console.log("payment_intent.payment_failed");
      case "checkout.session.completed":
        console.log("tutaj");
        //retrive data
        const orderList = JSON.parse(paymentIntent.metadata.orderList);
        const address = JSON.parse(paymentIntent.metadata.address);
        const order = { ...address, orderList };

        //set an order in db
        await strapi.services.order.create(order);
      default:
        return;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  },
};
