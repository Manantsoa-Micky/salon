const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.post('/addService', userController.addService);
router.get('/services', userController.getUserServices);
router.delete('/removeService', userController.removeService);

module.exports = router;
