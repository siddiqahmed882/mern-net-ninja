const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
