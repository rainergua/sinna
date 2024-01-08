const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();
const {
    listarTransacciones, listarMenus, obtenerModulos,
} = require ('../controllers/workflow.controller')
/**
 * @swagger
 * components:
 *  schemas:
 *      Workflow_transacciones:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: string
 *                  description: ci del usuario, para identificar el perfil asignado
 *              tabla:
 *                  type: string
 *                  description: número de la tabla transaccional
 *              estado:
 *                  type: string
 *                  description: es el estado consultado para obtener las transacciones
 *          required:
 *              - ci_usuario
 *              - tabla
 *              - estado
 *          example:
 *              ci_usuario: '6751241'
 *              tabla: '3'
 *              estado: 'CREADO'
 */
/**
 * @swagger
 * /api/workflow/listarTransacciones:
 *  post:
 *      summary: Obtiene el listado de transacciones habilitadas a aplicar segun el estado<v_json>
 *      tags: [Listar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Workflow_transacciones'
 *      responses:
 *          200:
 *              description: Listado de transacciones obtenidas correctamente
 *
 */

router.post('/listarTransacciones', verificaToken,listarTransacciones);

/**
 * @swagger
 * components:
 *  schemas:
 *      Workflow_menus:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: string
 *                  description: ci del usuario, para identificar el perfil asignado
 *              moudlo:
 *                  type: string
 *                  description: modulo del que se quiere obtener la lista de menus
 *          required:
 *              - ci_usuario
 *              - modulo
 *          example:
 *              ci_usuario: '6751241'
 *              modulo: 'MOSPA'
 */
/**
 * @swagger
 * /api/workflow/listarMenus:
 *  post:
 *      summary: Obtiene la lista de menús de acuerdo al modulo solicitado<v_json>
 *      tags: [Listar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Workflow_menus'
 *      responses:
 *          200:
 *              description: Listado de menus obtenido correctamente
 */

router.post('/listarMenus', verificaToken,listarMenus);

/**
 * @swagger
 * components:
 *  schemas:
 *      Workflow_modulos:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: string
 *                  description: ci del usuario, para identificar el perfil asignado
 *          required:
 *              - ci_usuario
 *          example:
 *              ci_usuario: '6751241'
 */
/**
 * @swagger
 * /api/workflow/obtenerModulos:
 *  post:
 *      summary: Obtiene los modulos a los que tiene acceso un usuario
 *      tags: [Listar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Workflow_modulos'
 *      responses:
 *          200:
 *              description: Listado de modulos obtenidos correctamente
 */
router.post('/obtenerModulos', verificaToken,obtenerModulos);


module.exports = router;
