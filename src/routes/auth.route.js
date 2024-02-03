const { Router } = require('express');
const authcontroller = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', authcontroller.signup_post);
router.post('/login', authcontroller.login_post);

module.exports = router;
