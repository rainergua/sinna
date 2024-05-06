const express = require('express');
const passport = require('passport');
const router = express.Router();

const  upload = require ('../middlewares/imageUploadMiddleware')
const { 
    gestionDefensoria,
    gestionRedesReg,
    updFileDef,
    getDefensoriaMuni,
    //obtieneDepto,
    //obtieneProv,
    //obtieneMun,
    obtieneDefensorias,
    obtieneDef,
    obtieneUsuarioDefensoria,
    obtieneSelMunis,
    obtieneRedes
} = require ('../controllers/mid_defensorias.controller')
/**
 * @swagger
 * components:
 *  schemas:
 *      Defensoria:
 *          type: object
 *          properties:
 *              id_defensorias:
 *                  type: integer
 *                  description: the user name
 *              municipio:
 *                  type: integer
 *                  description: Id del Municipio
 *              distrito:
 *                  type: string
 *                  description: Distrito Municipal al Cual Pertenece
 *              responsable:
 *                  type: string
 *                  description: Responsable de la Defensoria
 *              descripcion:
 *                  type: string
 *                  description: Breve descripicon de la defensoría
 *              telefono:
 *                  type: string
 *                  description: Número telefónico de la defensoría
 *              celular:
 *                  type: string
 *                  description: Número de celular de la defensoría
 *              direccion:
 *                  type: string
 *                  description: dirección exacta de la defensoria
 *              transacción:
 *                  type: string
 *                  description: CREAR_DEF,EDITAR_DEF,ELIMINAR_DEF,RESTAURAR_DEF
 *              estado:
 *                  type: string
 *                  description: ACTIVO o INACTIVO
 *              login:
 *                  type: string
 *                  description: el login del usuario
 *          required:
 *              - municipio
 *              - distrito
 *              - descripcion
 *              - telefono
 *              - celular
 *              - direccion
 *              - transaccion
 *              - estado
 *              - login
 *          example:
 *              id_defensorias: 5
 *              municipio: Cod_municipio
 *              distrito: distrito Uno
 *              responsable: Carlos Paredews
 *              descripcion: Defensoria Macrodistrito Centro
 *              telefono: 2450000
 *              celular: 710101010
 *              direccion: Av Camacho 1232
 *              transaccion: CREAR_DEF
 *              estado: ACTIVO
 *              login: 4765533
 */
/**
 * @swagger
 * /api/mid/gestiondefensoria:
 *  post:
 *      summary: Envía los datos para la gestión de Defensorias (ABM). El obejto en el request debe llarse <v_json>
 *      tags: [Altas, Bajas, Modificaciones]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Defensoria'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */

router.post('/gestiondefensoria', passport.authenticate('jwt', {session:false}), gestionDefensoria);

//
router.post('/gestionregredes', passport.authenticate('jwt', {session:false}), gestionRedesReg);

router.post('/updfiledef', upload.single('file'), updFileDef);

/**
 * @swagger
 * /api/mid/obtienedefensorias:
 *  get:
 *      summary: Obtiene todas las defensorias del Pais
 *      tags: [Defensorias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/obtienedefensorias', passport.authenticate('jwt', {session:false}), obtieneDefensorias);
router.get ('/obtieneselmunis', passport.authenticate('jwt', {session:false}), obtieneSelMunis)
router.get('/obtieneredes', passport.authenticate('jwt', {session:false}), obtieneRedes);
/**
 * @swagger
 * /api/mid/obtienedef/{id}:
 *  get:
 *      summary: Obtiene Una defensoria con id = ${id}
 *      tags: [Defensorias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: Id del Departamento
 *             required: true
 *             schema:
 *                  type: integer  
 *                  style: simple
 * 
 */
router.get('/obtienedef/:id', passport.authenticate('jwt', {session:false}), obtieneDef);

//getdefensoriamuni
router.get('/getdefensoriamuni/:id_muni', passport.authenticate('jwt', {session:false}), getDefensoriaMuni);

router.get('/obtieneusudef', passport.authenticate('jwt', {session:false}), obtieneUsuarioDefensoria);

//router.post('/gettoken', getToken);


//router.put('/gettoken', getToken);
module.exports = router;
