"use strict";
const { sanitizeEntity } = require("strapi-utils");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = {
  async create({ request, response, query }) {
    const order = request.body;

    const orders = await strapi.services.order.find(query);

    const isInOrders = orders.filter(
      ({ session_id }) => order.session_id === session_id
    );

    if (isInOrders.length) {
      response.send({ messsage: "order allready placed" });
    } else {
      const entity = await strapi.services.order.create(order);

      return sanitizeEntity(entity, { model: strapi.models.order });
    }
  },
};
