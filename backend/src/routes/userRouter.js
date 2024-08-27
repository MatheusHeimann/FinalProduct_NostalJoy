const router = require('express').Router();
const { storeUser, loginUser } = require('../controller/userController');

router.post('/register', storeUser);
router.post('/login', loginUser); // Nova rota para login
router.post('/save-highscore',) // Rota pra salvar o highscore

module.exports = router;
