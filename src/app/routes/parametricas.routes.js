const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();
const {
    listarParametricas, listarDepartamentos, listarProvincias, listarMunicipios, obtieneDepto, obtieneProv, obtieneMun,
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

/**
 * @swagger
 * /api/parametricas/obtienedepto:
 *  get:
 *      summary: Obtiene los departamentos del Pais
 *      tags: [Departamentos]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/obtienedepto', obtieneDepto);
/**
 * @swagger
 * /api/parametricas/obtieneprov/{id}:
 *  get:
 *      summary: Obtiene las provincias de un departamento
 *      tags: [Provincias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: Id del Departamento
 *             required: true
 *             schema:
 *                  type: string  
 *                  style: simple
 * 
 */

router.get('/obtieneprov/:id', obtieneProv);
/**
 * @swagger
 * /api/parametricas/obtienemun/{id}:
 *  get:
 *      summary: Obtiene los municpios de una provincia
 *      tags: [Municipios]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: Id del Departamento
 *             required: true
 *             schema:
 *                  type: string  
 *                  style: simple
 * 
 */
router.get('/obtienemun/:id', obtieneMun);
module.exports = router;
