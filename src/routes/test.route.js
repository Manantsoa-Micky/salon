const { Router } = require('express');

const testController = require('../controllers/test.controller');

const router = Router();

router.get('/', testController.test_get);

module.exports = router;
