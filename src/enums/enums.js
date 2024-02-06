const Enum = require('./proxy');

const UserRole = Enum({
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer',
});

const OrderStatus = Enum({
  INITIATED: 'initiated',
  PENDING: 'pending',
  PAID: 'paid',
  DONE: 'done',
  CANCELLED: 'cancelled',
});

const cartStatus = Enum({
  CREATED: 'created',
  CLEARED: 'cleared',
  PAID: 'paid',
});

module.exports = {
  UserRole,
  OrderStatus,
  cartStatus,
};
