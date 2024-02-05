const userService = require('../services/user.service');
const productService = require('../services/product.service');

const getUserServices = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const user = await userService.getUserByFilter({ _id: userId });

    res.status(200).json({ services: user.services });
  } catch (error) {
    next(error);
  }
};

const addService = async (req, res, next) => {
  try {
    const list = [];
    const { serviceName, userId } = req.body;
    const filter = { name: serviceName };
    const service = await productService.getProductByFilter(filter);
    list.push(service[0]._id);

    const user = await userService.addService(userId, list);

    res.status(200).json({ services: user });
  } catch (error) {
    next(error);
  }
};

const removeService = async (req, res, next) => {
  try {
    const { serviceName, userId } = req.body;
    const serviceToRemove = await productService.getProductByFilter({
      name: serviceName,
    });
    const filter = { _id: userId };
    const update = { $pull: { services: serviceToRemove[0]._id } };

    const user = await userService.updateUser(filter, update);

    res.status(200).json({ services: user.services });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addService,
  removeService,
  getUserServices,
};
