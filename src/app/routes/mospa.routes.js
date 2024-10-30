const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarCentros, gestionCentros, obtenerTerritorioUsr, datosCentro,listaCentrosUsuario
} = require ('../controllers/mospa.controller')
const {getMe} = require("../controllers/auth.controller");
/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      listar_centros:
 *          type: object
 *          properties:
 *              tipo_centro:
 *                  type: integer
 *                  description: tipo de centro del modulo MOSPA, puede ser 4 o 5
 *              estado:
 *                  type: string
 *                  description: estado del registro solicitado
 *          required:
 *              - tipo_centro
 *              - estado
 *          example:
 *              tipo_centro: 4
 *              estado: CREADO
 */
/**
 * @swagger
 * /api/mospa/listarCentros:
 *  post:
 *      summary: Obtiene el listado de centros segun el tipo y el estado<v_json>
 *      tags: [Listar,MOSPA Centros]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/listar_centros'
 *      responses:
 *          200:
 *              description: Listado ok
 *
 */

router.post(
    '/listarCentros',
    passport.authenticate('jwt',{session:false}),
    listarCentros
);

/**
 * @swagger
 * components:
 *  schemas:
 *      gestionCentros:
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
 * /api/mospa/gestionCentros:
 *  post:
 *      summary: Realiza la gestion de los centros
 *      tags: [Altas, Bajas, Modificaciones, MOSPA Centros]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Gestion'
 *      responses:
 *          200:
 *              description: Listado ok
 *
 */

router.post(
    '/gestionCentros',
    passport.authenticate('jwt',{session:false}),
    gestionCentros
);
/**
 * @swagger
 * /api/mospa/obtenerTerritorioUsr:
 *  get:
 *      summary: Obtiene datos de Territorio
 *      tags: [Listar, MOSPA Centros, Municipio]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.get(
    '/obtenerTerritorioUsr',
    passport.authenticate('jwt',{session:false}),
    obtenerTerritorioUsr
);
/**
 * @swagger
 * /api/mospa/datosCentro:
 *  get:
 *      summary: Obtiene datos del Centro
 *      tags: [Listar, MOSPA Centros]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.get(
    '/datosCentro',
    passport.authenticate('jwt',{session:false}),
    datosCentro
);

router.get(
    '/datosUsuario',
    passport.authenticate('jwt',{session:false}),
    getMe
);


router.get(
    '/listaCentrosUsuario',
    passport.authenticate('jwt',{session:false}),
    listaCentrosUsuario
);



module.exports = router;
