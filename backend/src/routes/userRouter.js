const router = require('express').Router();
const { storeUser, loginUser } = require('../controller/userController');

router.post('/register', storeUser);
router.post('/login', loginUser); // Nova rota para login

module.exports = router;
