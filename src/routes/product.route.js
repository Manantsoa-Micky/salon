const { Router } = require('express');
const productController = require('../controllers/product.controller');

const router = Router();

router.post('/add', productController.createProduct);
router.post('/seed', productController.seedProduct);
router.get('/all', productController.getAll);
router.get('/one', productController.getById);
router.put('/updateOne', productController.updateOne);
router.delete('/deleteOne', productController.deleteOne);

module.exports = router;
