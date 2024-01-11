const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { 
    getMe,
} = require ('../controllers/auth.controller')

/**
 * @swagger
 * components:
 *  schemas:
 *      Auth:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: string
 *                  description: CI del usuario
 *              password:
 *                  type: string
 *                  description: contraseña del usuario
 *          required:
 *              - ci_usuario
 *              - password
 *          example:
 *              ci_usuario: 6751241
 *              password: admin123
 */
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Autenticación de usuario local
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Auth'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas",
                cod: 401
            });
        }
        const payload = {
            sub: user.id_usuario,
            ci: user.ci_usuario
        };
        //aca configurar el tiempo del token
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({
            datoAdicional: {
                user,
                token
            },
            mensaje: "Bienvenido al sistema SINNA",
            cod: 200
        });
    })(req, res, next);
});

/**
 * @swagger
 * /api/auth/me:
 *  get:
 *      summary: Obtiene los datos del usuario mediante el token
 *      tags: [auth]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/me', 
    passport.authenticate('jwt', {session:false}),
    getMe
);


module.exports = router;




