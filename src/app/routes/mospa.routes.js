const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const passport =require('passport')
const router = express.Router();
const {
    listarCentros,
} = require ('../controllers/mospa.controller')
/**
 * @swagger
 * components:
 *  schemas:
 *      Mospa:
 *          type: object
 *          properties:
 *              tipo_centro:
 *                  type: integer
 *                  description: tipo de centro del modulo MOSPA, puede ser 4 o 5
 *              alcance:
 *                  type: integer
 *                  description: el id del departamento, en caso de 0 se muestra todos
 *          required:
 *              - tipo_centro
 *              - alcance
 *          example:
 *              tipo_centro: 4
 *              alcance: 3
 */
/**
 * @swagger
 * /api/mospa/listarCentros:
 *  post:
 *      summary: Obtiene el listado de centros segun el tipo y el alcance<v_json>
 *      tags: [Listar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Mospa'
 *      responses:
 *          200:
 *              description: Listado ok
 *
 */

router.post('/listarCentros', passport.authenticate('jwt',{session:false}),listarCentros);


module.exports = router;
