const express = require('express');
const router = express.Router();
const passport = require("passport");


const {
    /*listarParametricas,
    listarDepartamentos,
    listarProvincias,
    listarMunicipios,*/
    obtieneDepto,
    obtieneProv,
    obtieneMun, obtieneParam,
} = require ('../controllers/parametricas.controller')

/**
 * @swagger
 * /api/parametricas/obtieneparm:
 *  get:
 *      summary: Obtiene listado de parametricas
 *      tags: [Parametricas]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */

router.get('/obtieneparam', passport.authenticate('jwt',{session:false}),obtieneParam);

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
router.get('/obtienedepto', passport.authenticate('jwt',{session:false}), obtieneDepto);
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

router.get('/obtieneprov/:id', passport.authenticate('jwt',{session:false}), obtieneProv);
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
router.get('/obtienemun/:id', passport.authenticate('jwt',{session:false}), obtieneMun);
module.exports = router;
