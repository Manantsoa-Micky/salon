const Order = require('../models/order.schema');

const createOrder = async (data) => {
  const order = await Order.create(data);
  return order;
};
