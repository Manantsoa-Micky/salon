const productService = require('../services/product.service');

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ product: product });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(201).json({ product: products });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const products = await productService.getProductById(req.id);
    res.status(201).json({ products: products });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.body);
    res.status(201).json({ product: product });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { name } = req.body;
    const product = await productService.deleteProduct(name);
    res.status(200).json({ product: product });
  } catch (error) {
    next(error);
  }
};

const seedProduct = async (req, res, next) => {
  try {
    const products = await productService.seedProduct();
    res.status(201).json({
      product: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  seedProduct,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
