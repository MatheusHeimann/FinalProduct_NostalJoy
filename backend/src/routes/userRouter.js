const router = require('express').Router();
const { storeUser, loginUser, saveHighScore, scoreUser } = require('../controller/userController');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     description: Registra um novo usuário no sistema com email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               senha:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.post('/register', storeUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de um usuário
 *     description: Realiza login do usuário com email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               senha:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "João"
 */

router.post('/login', loginUser); 

/**
 * @swagger
 * /api/save_highscore:
 *   post:
 *     summary: Salva o highscore do usuário
 *     description: Salva a pontuação máxima do usuário em um jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               pontuacao:
 *                 type: integer
 *                 example: 9999
 *     responses:
 *       200:
 *         description: Highscore salvo com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.post('/save_highscore', saveHighScore); 

/**
 * @swagger
 * /api/highScore:
 *   post:
 *     summary: Busca a pontuação máxima do usuário
 *     description: Retorna a pontuação máxima do usuário em cada jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pontuações carregadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   jogo:
 *                     type: string
 *                     example: "Pacman"
 *                   pontuacao:
 *                     type: integer
 *                     example: 1500
 */

router.post('/highScore', scoreUser);

module.exports = router;
