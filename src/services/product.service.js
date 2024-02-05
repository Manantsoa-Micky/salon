const Product = require('../models/product.schema');
const seed = require('../sampleData/products.json');

const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductById = async (productId) => {
  const products = await Product.findById(productId);
  return products;
};

const updateProduct = async (name, update) => {
  const product = await Product.findOneAndUpdate({ name: name }, update);
  return product;
};

const deleteProduct = async (productName) => {
  const product = await Product.findOneAndDelete({ name: productName });
  return product;
};

const seedProduct = async () => {
  for (const category in seed) {
    seed[category].forEach(async (product) => {
      const data = {
        name: product,
        price: 0,
        description: 'lorem ipsum',
        category: category,
        commission: 5,
        images: [],
        duration: 1,
      };
      await Product.create(data);
    });
  }
  const list = await Product.find();
  return list;
};

module.exports = {
  updateProduct,
  deleteProduct,
  createProduct,
  getAllProducts,
  getProductById,
  seedProduct,
};
