const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();
const {
    listarParametricas, listarDepartamentos, listarProvincias, listarMunicipios,
} = require ('../controllers/parametricas.controller')
/**
 * @swagger
 * components:
 *  schemas:
 *      Parametricas:
 *          type: object
 *          properties:
 *              id_parametro_padre:
 *                  type: integer
 *                  description: id del parametro padre para obtener el listado
 *          required:
 *              - id_parametro_padre
 *          example:
 *              id_parametro_padre: 4
 */
/**
 * @swagger
 * /api/parametricas/listarParametricas:
 *  post:
 *      summary: Obtiene el conjunto de parametros para los combos de los formularios
 *      tags: [Listar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Parametricas'
 *      responses:
 *          200:
 *              description: Listado de parametricas
 *
 */

router.post('/listarParametricas', verificaToken,listarParametricas);
router.get('/listarDepartamentos', verificaToken,listarDepartamentos);
router.post('/listarProvincias', verificaToken,listarProvincias);
router.post('/listarMunicipios', verificaToken,listarMunicipios);


module.exports = router;
