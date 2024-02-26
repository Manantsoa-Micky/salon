const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.post('/addService', userController.addService);
router.get('/get/:userId', userController.getOneUser);
router.get('/services', userController.getUserServices);
router.get('/allUsers', userController.getAllUsers);
router.delete('/removeService', userController.removeService);
router.post('/addToCart', userController.addToCart);
router.post('/addReview', userController.addReview);
router.delete('/delete', userController.deleteUser);
router.post('/seedUsers', userController.seedUsers);
router.get('/test', (req, res, next) => {
  try {
    res.status(200).json({ name: 'Micky', age: 27 });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
