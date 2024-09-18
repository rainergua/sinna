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
    obtieneRedes, centroUsuario
} = require ('../controllers/mid_defensorias.controller')
/**
 * @swagger
 * components:
 *  schemas:
 *      gestiondefensoria:
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
 *      tags: [Altas, Bajas, Modificaciones, MID Defensorias]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/gestiondefensoria'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */

router.post(
    '/gestiondefensoria',
    passport.authenticate('jwt', {session:false}),
    gestionDefensoria
);
/**
 * @swagger
 * components:
 *  schemas:
 *      gestionregredes:
 *          type: object
 *          properties:
 *              id_reg_red:
 *                  type: integer
 *                  description: Id de la Red
 *              descripcion_red:
 *                  type: string
 *                  description: Nombre o descripcion de la red
 *              municipio_red:
 *                  type: array
 *                  items:
 *                      type: integer
 *                  description: Id de los municipios que componen la red
 *              nombre_coord:
 *                  type: string
 *                  description: Nombre del coordinador de la RED del VIO
 *              fono_coord:
 *                  type: string
 *                  description: Telefono del coordinador de la RED
 *              observacion:
 *                  type: string
 *                  description: Observaciones del registro
 *              norma_respaldo:
 *                  type: string
 *                  description: Norma o convenio que respalda la implementación de la Red
 *              estado:
 *                  type: string
 *                  description: Estado del registro
 *              transaccion:
 *                  type: string
 *                  description: Transaccion del registro
 *              ci_usuario:
 *                  type: string
 *                  description: CI del usuario que va a crear el registro
 *          required:
 *              - id_reg_red
 *              - descripcion_red
 *              - municipio_red
 *              - nombre_coord
 *              - fono_coord
 *              - estado
 *              - transaccion
 *              - ci_usuario
 *          example:
 *              id_reg_red: 1
 *              descripcion_red: Red 1
 *              municipio_red: [34, 35, 36]
 *              nombre_coord: Juan Condori Quehui
 *              fono_coord: "65222222"
 *              observacion: Observaciones
 *              norma_respaldo: Acuerdo 123-23
 *              estado: CREADO
 *              transaccion: CREAR
 *              ci_usuario: "16021"
 */
/**
 * @swagger
 * /api/mid/gestionregredes:
 *  post:
 *      summary: Envía los datos para la gestión de Redes del MID (ABM). El obejto en el request debe llarse <v_json>
 *      tags: [Altas, Bajas, Modificaciones, MID Redes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/gestionregredes'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post(
    '/gestionregredes',
    passport.authenticate('jwt', {session:false}),
    gestionRedesReg
);

router.post(
    '/updfiledef',
    upload.single('file'),
    updFileDef
);

/**
 * @swagger
 * /api/mid/obtienedefensorias:
 *  get:
 *      summary: Obtiene todas las defensorias del Pais
 *      tags: [Listar, MID Defensorias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get(
    '/obtienedefensorias',
    passport.authenticate('jwt', {session:false}),
    obtieneDefensorias
);
/**
 * @swagger
 * /api/mid/obtieneselmunis:
 *  get:
 *      summary: Obtiene la lista de municipios para Redes
 *      tags: [Listar, MID Redes]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.get (
    '/obtieneselmunis',
    passport.authenticate('jwt', {session:false}),
    obtieneSelMunis
)
/**
 * @swagger
 * /api/mid/obtieneredes:
 *  get:
 *      summary: Obtiene la lista de Redes
 *      tags: [Listar, MID Redes]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.get(
    '/obtieneredes',
    passport.authenticate('jwt', {session:false}),
    obtieneRedes
);
/**
 * @swagger
 * /api/mid/obtienedef/{id}:
 *  get:
 *      summary: Obtiene Una defensoria con id = ${id}
 *      tags: [Listar, MID Defensorias]
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
router.get(
    '/obtienedef/:id',
    passport.authenticate('jwt', {session:false}),
    obtieneDef
);

/**
 * @swagger
 * /api/mid/getdefensoriamuni/{id_muni}:
 *  get:
 *      summary: Obtiene la lista de defensorias que son parte del municipio que sea igual a id_muni = ${id_muni}
 *      tags: [Listar, MID Defensorias, Municipio]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id_muni
 *             in: path
 *             description: Id del Municpio
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *
 */
router.get(
    '/getdefensoriamuni/:id_muni',
    passport.authenticate('jwt', {session:false}),
    getDefensoriaMuni
);
/**
 * @swagger
 * /api/mid/obtieneusudef:
 *  get:
 *      summary: Obtiene la lista de usuarios de la defensoria, en base al CI del usuario
 *      tags: [Listar, MID Defensorias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 */
router.get(
    '/obtieneusudef',
    passport.authenticate('jwt', {session:false}),
    obtieneUsuarioDefensoria
);
/**
 * @swagger
 * /api/mid/centroUsuario:
 *  get:
 *      summary: Obtiene la lista de centros o DNA a las que el usuario tiene acceso, en base al CI del usuario
 *      tags: [Listar, MID Defensorias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 */
router.get(
    '/centroUsuario',
    passport.authenticate('jwt', {session:false}),
    centroUsuario
);

module.exports = router;
