const express = require('express');
const passport = require('passport');
const router = express.Router();
const { 
    juzgadosParametricas,
    juzgadosTerritorio,
    gestionJuzgados, 
    mostrarJuzgados,
    mostrarJuzgado,
} = require ('../controllers/comun_juzgados.controller')

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
 * /api/juzgados/juzgado-parametricas:
 *  get:
 *      summary: Obtiene las parametricas para el registro de Juzgados
 *      tags: [juzgados]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/juzgados-parametricas',
    passport.authenticate('jwt', {session:false}),
    juzgadosParametricas
);

/**
 * @swagger
 * /api/juzgados/territorio/{id}:
 *  get:
 *      summary: Obtiene datos territoriales de acuerdo con el id enviado
 *      tags: [juzgados]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: Llave padre 
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 * 
 */
router.get('/territorio/:id', passport.authenticate('jwt', {session:false}), juzgadosTerritorio);

/**
 * @swagger
 * components:
 *  schemas:
 *      juzgados:
 *          type: object
 *          properties:
 *              id_juzgado:
 *                  type: integer
 *                  description: id del juzgado
 *              tipo_juzgado:
 *                  type: integer
 *                  description: ID del tipo del juzgado {59 o 60}
 *              juzgado:
 *                  type: string
 *                  description: Descripción del juzgado
 *              municipio:
 *                  type: integer
 *                  description: ID del municipio
 *              observaciones:
 *                  type: integer
 *                  description: Id del genero
 *              transacción:
 *                  type: string
 *                  description: {CREAR_JUZGADO,EDITAR_JUZGADO,ELIMINAR_JUZGADO,RESTAURAR_JUZGADO, MOSTRAR_JUZGADO}
 *              estado:
 *                  type: string
 *                  description: {INICIAL, CREADO o ELIMINADO}
 *          required:
 *              - transaccion
 *              - estado
 *          example:
 *              id_juzgado: 5
 *              tipo_juzgado: 59
 *              juzgado: 'Juzgado Público de la Niñez y Adolescencia La Paz Nº1'
 *              municipio: 152
 *              observaciones: 'Texto de referencia'
 *              transaccion: 'EDITAR_JUZGADO'
 *              estado: 'CREADO'
 */
/**
 * @swagger
 * /api/juzgados/gestion:
 *  post:
 *      summary: Envía los datos para la gestión de Centros de Acogida (ABM). El objeto en el request debe llamarse <v_json>
 *      tags: [juzgados]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/juzgados'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/gestion', passport.authenticate('jwt', {session:false}), gestionJuzgados);

/**
 * @swagger
 * /api/juzgados/mostrar-juzgados:
 *  post:
 *      summary: lista de los Juzgados registrados
 *      tags: [juzgados]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/mostrar-juzgados', passport.authenticate('jwt', {session:false}),mostrarJuzgados);

/**
 * @swagger
 * /api/juzgados/mostrar-juzgado/{id}:
 *  get:
 *      summary: Obtiene datos del Juzgado según el id enviado
 *      tags: [juzgados]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: ID del Juzgado
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 * 
 */
router.get('/mostrar-juzgado/:id', passport.authenticate('jwt', {session:false}), mostrarJuzgado);

module.exports = router;




