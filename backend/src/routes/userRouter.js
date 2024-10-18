const router = require('express').Router();
const { storeUser, loginUser, saveHighScore, scoreUser } = require('../controller/userController');

/**
 *@swagger
 * /api/register:
 *  get: 
 *    summary: cadastra um novo usuario 
 *    responses:
 *      200
 *         description: Cadastra um novo usuario
 *         content:
 *             application/json:
 *                 schema:
 *                     type: array  
 *                     items:
 *                         type: object
 */

router.post('/register', storeUser);

/**
 *@swagger
 * /api/login:
 *  get: 
 *    summary: Login de um usuario 
 *    responses:
 *      200
 *         description: Login de um usuario
 *         content:
 *             application/json:
 *                 schema:
 *                     type: array  
 *                     items:
 *                         type: object
 */

router.post('/login', loginUser); // Nova rota para login

/**
 *@swagger
 * /api/save_highscore:
 *  get: 
 *    summary: salva o highscore do usuario
 *    responses:
 *      200
 *         description: salva o highscore do usuario
 *         content:
 *             application/json:
 *                 schema:
 *                     type: array  
 *                     items:
 *                         type: object
 */
router.post('/save_highscore', saveHighScore) // Rota pra salvar o highscore

router.get('/highScore', scoreUser) // Busca a pontuação máxima do usuario em cada jogo 

module.exports = router;
