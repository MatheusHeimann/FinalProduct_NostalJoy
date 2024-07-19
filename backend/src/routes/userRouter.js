const router = require('express').Router();

const { storeUser } = require('../controller/userController');

router.post('/register', storeUser);

module.exports = router;