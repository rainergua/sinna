const express = require('express');
const passport = require('passport');
const router = express.Router();

const { 
    getPersonaCi,
    listarPersonas,
    gestionPersona,
} = require ('../controllers/comun.controller')

/**
 * @swagger
 * /api/comun/getpersonaci/{ci}:
 *  get:
 *      summary: Obtiene a una persona enviando el núimero de carnet
 *      tags: [Comun]
 *      responses:
 *          200:
 *              description: Peticion 
 *      parameters:
 *           - name: ci
 *             in: path
 *             description: Cedula de Identidad
 *             required: true
 *             schema:
 *                  type: integer  
 *                  style: simple
 * 
 */
router.get('/getpersonaci/:ci', getPersonaCi);
/**
 * @swagger
 * /api/persona/persona:
 *  post:
 *      summary: Envía los datos para la gestión de personas (ABM). El objeto en el request debe llamarse <v_json>
 *      tags: [Persona]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/persona', 
    passport.authenticate('jwt', {session:false}), 
    gestionPersona
);


router.get('/listarPersonas', listarPersonas);

module.exports = router;
