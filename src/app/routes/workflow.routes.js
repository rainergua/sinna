const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();
const {
    listarTransacciones,
    listarMenus,
} = require ('../controllers/workflow.controller')
/**
 * @swagger
 * components:
 *  schemas:
 *      Workflow:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: varchar
 *                  description: ci del usuario, para identificar el perfil asignado
 *              tabla:
 *                  type: varchar
 *                  description: numero de la tabla transaccional
 *              estado:
 *                  type:varchar
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
 *                      $ref: '#/components/schemas/Workflow'
 *      responses:
 *          200:
 *              description: Listado de transacciones obtenidas correctamente
 *
 */

router.post('/listarTransacciones', verificaToken,listarTransacciones);
router.post('/listarMenus', verificaToken,listarMenus);


module.exports = router;
