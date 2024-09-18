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
    obtieneMun,
    obtieneParam,
    obtieneMunDpto,
    obtenerPoblacionAtiende,
    obtieneDnasMunicipio,
    listaCdaTerritorio,
    listaCentrosMospaDpto,
    listarJuzgados,
    obtenerCdaGralCombo
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

router.get(
    '/obtieneparam/:id',
    passport.authenticate('jwt',{session:false}),
    obtieneParam
);

router.get(
    '/listaCdaTerritorio/:id/:tipo',
    passport.authenticate('jwt',{session:false}),
    listaCdaTerritorio
);

router.get(
    '/listaCentrosMospaDpto/:id/:tipo',
    passport.authenticate('jwt',{session:false}),
    listaCentrosMospaDpto
);

router.get(
    '/listarJuzgados',
    passport.authenticate('jwt',{session:false}),
    listarJuzgados
);


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
/**
 * @swagger
 * /api/parametricas/obtieneDnasMunicipio/{id}:
 *  get:
 *      summary: Obtiene las DNA's de un municipio
 *      tags: [Municipio, MID Defensorias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: Id del Municipio
 *             required: true
 *             schema:
 *                  type: string
 *                  style: simple
 *
 */

router.get('/obtieneDnasMunicipio/:id',
    passport.authenticate('jwt',{session:false}),
    obtieneDnasMunicipio
);
/**
 * @swagger
 * /api/parametricas/obtieneMunDpto/{id}:
 *  get:
 *      summary: Obtiene los municipos de un departamento
 *      tags: [Municipio]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: Id del departamento
 *             required: true
 *             schema:
 *                  type: string
 *                  style: simple
 *
 */
router.get('/obtieneMunDpto/:id',
    passport.authenticate('jwt',{session:false}),
    obtieneMunDpto
);


router.get('/obtenerPoblacionAtiende',
    passport.authenticate('jwt',{session:false}),
    obtenerPoblacionAtiende
);

router.get('/obtenerCdaGralCombo',
    passport.authenticate('jwt',{session:false}),
    obtenerCdaGralCombo
);
module.exports = router;
