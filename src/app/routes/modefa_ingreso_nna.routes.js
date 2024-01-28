const express = require('express');
const passport = require('passport');
const router = express.Router();
const { 
    getCentroAcogidaUsuario,
    getBuscarPersonaMid,
    getListarAcogidosNna,
    getParametricasIngreso,
    gestionAcogidaNaa,
    getParametricasTransferencia,
    getCentrosMunicipio
} = require ('../controllers/modefa_ingreso_nna.controller');
const upload = require('../middlewares/imageUploadMiddleware');

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
 * /api/modefa/centro-usuario:
 *  get:
 *      summary: Obtener los centros asignados a un usuario
 *      tags: [ingreso_nna]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/centro-usuario',
    passport.authenticate('jwt', {session:false}),
    getCentroAcogidaUsuario
);

/**
 * @swagger
 * /api/modefa/buscar-mid/{buscar}:
 *  get:
 *      summary: Buscar los datos de una persona registrado en el MID
 *      tags: [ingreso_nna]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: buscar
 *             in: path
 *             description: Palabra a buscar
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 * 
 */
router.get('/buscar-mid/:buscar', passport.authenticate('jwt', {session:false}), getBuscarPersonaMid);

router.post('/acogidos-nna', 
    passport.authenticate('jwt', {session:false}), 
    getListarAcogidosNna);

router.get('/ingreso-parametrica/:id', 
    passport.authenticate('jwt', {session:false}), 
    getParametricasIngreso);

router.post('/gestion-acogida', 
    passport.authenticate('jwt', {session:false}), 
    upload.single('url_foto'),
    gestionAcogidaNaa);

router.get('/transferencia-parametrica/:id', 
    passport.authenticate('jwt', {session:false}), 
    getParametricasTransferencia);

router.get('/centros-municipio/:id', passport.authenticate('jwt', {session:false}), getCentrosMunicipio);

module.exports = router;
