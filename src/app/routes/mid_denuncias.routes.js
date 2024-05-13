const express = require('express');
const passport = require('passport');
const router = express.Router();

const  upload = require ('../middlewares/imageUploadMiddleware')
const { 
    getParametrosDenuncia,
    getMunicipioProvDep,
    gestionDenuncias,
    obtieneDenuncias,
    obtieneDen,
    guardaFam,
    obtieneFamiliares,
    obtienedendo,
    obtienedatosPrint,
    obtienedente,
    guardaDenPer,
    obtieneProfesionalDNA,
    derivarCaso,
} = require ('../controllers/mid_denuncias.controller')

/**
 * @swagger
 * /api/mid/obtieneparametros:
 *  get:
 *      summary: Obtiene parametros para el formulario de denuncias
 *      tags: [Denuncias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/obtieneparametros', passport.authenticate('jwt', {session:false}), getParametrosDenuncia);

router.get('/getmunicipioprovdep', passport.authenticate('jwt', {session:false}), getMunicipioProvDep)
/**
 * @swagger
 * /api/mid/obtienefamiliares:
 *  get:
 *      summary: Obtiene familiares relacionados o registrados en una denuncia
 *      tags: [Denuncias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 */
router.get('/obtienefamiliares/:cod_denuncia', passport.authenticate('jwt', {session:false}), obtieneFamiliares);

/**
 * @swagger 
 * /api/mid/obtienedendo/{cod_denuncia}:
 *  get:
 *      summary: Obtiene denunciados relacionados o registrados en una denuncia
 *      tags: [Denuncias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *         - name: cod_denuncia
 *           in: path
 *           description: Id del de la denuncia
 *           required: true
 *           schema:
 *              type: integer  
 *              style: simple
 */

router.get('/obtienedendo/:cod_denuncia', passport.authenticate('jwt', {session:false}), obtienedendo);
/**
 * @swagger 
 * /api/mid/obtienedente/{cod_denuncia}:
 *  get:
 *      summary: Obtiene denunciantes relacionados o registrados en una denuncia
 *      tags: [Denuncias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *         - name: cod_denuncia
 *           in: path
 *           description: Id del de la denuncia
 *           required: true
 *           schema:
 *              type: integer  
 *              style: simple
 */
router.get('/obtienedente/:cod_denuncia', passport.authenticate('jwt', {session:false}), obtienedente);

/**
 * @swagger
 * /api/mid/obtienedenuncias:
 *  get:
 *      summary: Obtiene todas las denuncias
 *      tags: [Denuncias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 
 */
router.get('/obtienedenuncias/:id', passport.authenticate('jwt', {session:false}), obtieneDenuncias);

/**
 * @swagger
 * /api/mid/obtieneden/{id}:
 *  get:
 *      summary: Obtiene una denuncia dada por el parámetro id
 *      tags: [Denuncias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *         - name: id
 *           in: path
 *           description: Id del de la denuncia
 *           required: true
 *           schema:
 *              type: integer  
 *              style: simple
 */
router.get('/obtieneden/:id', passport.authenticate('jwt', {session:false}), obtieneDen);

/**
 * @swagger
 * /api/mid/obtieneden/{id}:
 *  get:
 *      summary: Obtiene una denuncia dada por el parámetro id
 *      tags: [Denuncias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *         - name: id
 *           in: path
 *           description: Id del de la denuncia
 *           required: true
 *           schema:
 *              type: integer  
 *              style: simple
 */
router.get('/obtienedatosprint/:cod_denuncia', passport.authenticate('jwt', {session:false}), obtienedatosPrint);

router.get('/obtieneprofdna/:cod_defensoria', passport.authenticate('jwt', {session:false}),obtieneProfesionalDNA)

router.post('/gestiondenuncias', passport.authenticate('jwt', {session:false}), gestionDenuncias);

router.post('/guardafamiliar', passport.authenticate('jwt', {session:false}), guardaFam)
//guardadenper
router.post('/guardadenper', passport.authenticate('jwt', {session:false}), guardaDenPer)

router.post('/derivarcaso', passport.authenticate('jwt', {session:false}), derivarCaso)

module.exports = router;
