const Enum = require('./proxy');

const UserRole = Enum({
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer',
});

const OrderStatus = Enum({
  INITIATED: 'initiated',
  PENDING: 'pending',
  DONE: 'done',
  CANCELLED: 'cancelled',
});

module.exports = {
  UserRole,
  OrderStatus,
};
