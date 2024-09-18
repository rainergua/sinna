const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
   gestionAutorizacionesViaje, obtenerAutorizacionViaje, obtenerPersonasAutViaje, listarAutorizacionesViajeDna,
   subirFotoPadre, subirFotoMadre, subirFotoTutor, obtenerMunUsuario
} = require ('../controllers/mid_autorizaciones_viaje.controller')
const upload = require("../middlewares/imageUploadMiddleware");
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
 * components:
 *  schemas:
 *      autorizacionViaje:
 *          type: object
 *          properties:
 *            id_autorizacion_viaje:
 *                type: integer
 *                description: id de la autorización de viaje
 *            cod_autorizacion:
 *                type: string
 *                description: Código de la autorización de viaje, tipo CITE
 *            correo_solicitud:
 *                type: string
 *                description: Correo de la so licitud
 *            id_departamento:
 *                type: integer
 *                description: id del departamento donde se solicita el viaje
 *            id_municipio:
 *                type: integer
 *                description: id del municipio donde se solicita el viaje
 *            id_dna:
 *                type: integer
 *                description: id de la DNA
 *            fecha_inicio_viaje:
 *                type: string
 *                format: date-time
 *                description: fecha de inicio del viaje
 *            fecha_fin_viaje:
 *                type: string
 *                format: date-time
 *                description: fecha de fin del viaje
 *            fecha_solicitud_viaje:
 *                type: string
 *                format: date-time
 *                description: fecha de solicitud del viaje
 *            fecha_autorizacion_viaje:
 *                type: string
 *                format: date-time
 *                description: fecha de autorización del viaje
 *            destino_viaje:
 *                type: integer
 *                description: id del municipio destino del viaje
 *            motivo_viaje:
 *                type: string
 *                description: Descripción del motivo del viaje
 *            observaciones_viaje:
 *                type: string
 *                description: Observaciones del viaje
 *            tiene_tutor:
 *                type: boolean
 *                description: Si tiene tutor la NNA
 *            viaja_con_terceros:
 *                type: boolean
 *                description: Si viaja con terceros la NNA
 *            dias_viaje:
 *                type: integer
 *                description: Cantidad de dias de viaje
 *            tiene_padre:
 *                type: boolean
 *                description: Si la NNA tiene padre
 *            id_persona_padre:
 *                type: integer
 *                description: Id del Padre de la NNA
 *            viaja_con_padre:
 *                type: boolean
 *                description: Si viaja con el Padre
 *            padre_fallecido:
 *                type: boolean
 *                description: Si el padre ha fallecido
 *            padre_ausente:
 *                type: boolean
 *                description: Si el padre está ausente
 *            padre_nna:
 *                type: boolean
 *                description: Si el padre es menor de edad
 *            tiene_madre:
 *                type: boolean
 *                description: Si tiene madre la NNA
 *            id_persona_madre:
 *                type: integer
 *                description: El id de persona de la madre
 *            viaja_con_madre:
 *                type: boolean
 *                description: Si viaja con la madre la NNA
 *            madre_fallecida:
 *                type: boolean
 *                description: Si la madre de la NNA ha fallecido
 *            madre_ausente:
 *                type: boolean
 *                description: Si la madre está ausente
 *            madre_nna:
 *                type: boolean
 *                description: Si la madre de la NNA es menor de edad
 *            motivo_ausente:
 *                type: string
 *                description: El motivo de que el padre o madre está ausente
 *            id_persona_tutor:
 *                type: integer
 *                description: Id de persona del tutor
 *            viaja_con_tutor:
 *                type: boolean
 *                description: Si viaja con el tutor
 *            presentara_testigos:
 *                type: boolean
 *                description: Si presentará testigos
 *            nro_resolucion_tutor:
 *                type: string
 *                description: Número de resolución del tutor
 *            ci_usuario:
 *                type: string
 *                description: CI del usuario que está por aplicar la gestión
 *            estado:
 *                type: string
 *                description: Estado del registro
 *            transaccion:
 *                type: string
 *                description: Transacción que se aplicará
 *            edad_padre:
 *                type: integer
 *                description: Edad del padre
 *            edad_madre:
 *                type: integer
 *                description: Edad de la madre
 *            edad_tutor:
 *                type: integer
 *                description: Edad del tutor
 *          required:
 *              - transaccion
 *              - estado
 *              - login
 *          example:
 *                id_autorizacion_viaje: 1
 *                cod_autorizacion: MID-2024/AV-388
 *                correo_solicitud: correo@asdfa.com
 *                id_departamento: 3
 *                id_municipio: 25
 *                id_dna: 2
 *                fecha_inicio_viaje: "2024-01-01T00:00:00Z"
 *                fecha_fin_viaje: "2024-01-01T00:00:00Z"
 *                fecha_solicitud_viaje: "2024-01-01T00:00:00Z"
 *                fecha_autorizacion_viaje: "2024-01-01T00:00:00Z"
 *                destino_viaje: 56
 *                motivo_viaje: Vacaciones
 *                observaciones_viaje: Observaciones
 *                tiene_tutor: false
 *                viaja_con_terceros: true
 *                dias_viaje: 12
 *                tiene_padre: true
 *                id_persona_padre: 2
 *                viaja_con_padre: true
 *                padre_fallecido: false
 *                padre_ausente: true
 *                padre_nna: true
 *                tiene_madre: true
 *                id_persona_madre: 45
 *                viaja_con_madre: false
 *                madre_fallecida: false
 *                madre_ausente: false
 *                madre_nna: false
 *                motivo_ausente: Motivo de ausencia
 *                id_persona_tutor: 78
 *                viaja_con_tutor: false
 *                presentara_testigos: false
 *                nro_resolucion_tutor: 233-23
 *                ci_usuario: 16021
 *                estado: CREADO
 *                transaccion: CREAR
 *                edad_padre: 55
 *                edad_madre: 32
 *                edad_tutor: null
 */
/**
 * @swagger
 * /api/mid/gestionAutorizacionesViaje:
 *  post:
 *      summary: Envía los datos para la gestión de Autorizaciones de viaje de una NNA (ABM). El objeto en el request debe llamarse <v_json>
 *      tags: [Altas, Bajas, Modificaciones, MID Autorizaciones de Viaje]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/autorizacionViaje'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post(
    '/gestionAutorizacionesViaje',
    passport.authenticate('jwt',{session:false}),
    gestionAutorizacionesViaje
);
/**
 * @swagger
 * components:
 *  schemas:
 *      subirFotoPadreAutViaje:
 *          type: object
 *          properties:
 *            id_autorizacion_viaje:
 *                type: integer
 *                description: id de la autorización de viaje
 *            ci_usuario:
 *                type: string
 *                description: CI del usuario que está por aplicar la gestión
 *            estado:
 *                type: string
 *                description: Estado del registro
 *            transaccion:
 *                type: string
 *                description: Transacción que se aplicará
 *            url_ci_padre:
 *                type: string
 *                description: Foto del CI del Padre
 *          required:
 *              - transaccion
 *              - estado
 *              - login
 *          example:
 *                id_autorizacion_viaje: 1
 *                url_ci_padre: foto_padre.jpg
 *                ci_usuario: 16021
 *                estado: CREADO
 *                transaccion: SUBIR_FOTO_PADRE
 */
/**
 * @swagger
 * /api/mid/subirFotoPadre:
 *  post:
 *      summary: Sube la foto del CI del Padre de la autorización de viajes <v_json>
 *      tags: [Uploads, MID Autorizaciones de Viaje]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/subirFotoPadreAutViaje'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post(
    '/subirFotoPadre',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_ci_padre'),
    subirFotoPadre
);

/**
 * @swagger
 * components:
 *  schemas:
 *      subirFotoMadreAutViaje:
 *          type: object
 *          properties:
 *            id_autorizacion_viaje:
 *                type: integer
 *                description: id de la autorización de viaje
 *            ci_usuario:
 *                type: string
 *                description: CI del usuario que está por aplicar la gestión
 *            estado:
 *                type: string
 *                description: Estado del registro
 *            transaccion:
 *                type: string
 *                description: Transacción que se aplicará
 *            url_ci_madre:
 *                type: string
 *                description: Foto del CI de la Madre
 *          required:
 *              - transaccion
 *              - estado
 *              - login
 *          example:
 *                id_autorizacion_viaje: 1
 *                url_ci_padre: foto_madre.jpg
 *                ci_usuario: 16021
 *                estado: CREADO
 *                transaccion: SUBIR_FOTO_MADRE
 */
/**
 * @swagger
 * /api/mid/subirFotoMadre:
 *  post:
 *      summary: Sube la foto del CI de la Madre de la autorización de viajes <v_json>
 *      tags: [Uploads, MID Autorizaciones de Viaje]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/subirFotoMadreAutViaje'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post(
    '/subirFotoMadre',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_ci_madre'),
    subirFotoMadre
);

/**
 * @swagger
 * components:
 *  schemas:
 *      subirFotoTutorAutViaje:
 *          type: object
 *          properties:
 *            id_autorizacion_viaje:
 *                type: integer
 *                description: id de la autorización de viaje
 *            ci_usuario:
 *                type: string
 *                description: CI del usuario que está por aplicar la gestión
 *            estado:
 *                type: string
 *                description: Estado del registro
 *            transaccion:
 *                type: string
 *                description: Transacción que se aplicará
 *            url_ci_tutor:
 *                type: string
 *                description: Foto del CI del Tutor
 *          required:
 *              - transaccion
 *              - estado
 *              - login
 *          example:
 *                id_autorizacion_viaje: 1
 *                url_ci_padre: foto_tutor.jpg
 *                ci_usuario: 16021
 *                estado: CREADO
 *                transaccion: SUBIR_FOTO_TUTOR
 */
/**
 * @swagger
 * /api/mid/subirFotoMadre:
 *  post:
 *      summary: Sube la foto del CI de la Madre de la autorización de viajes <v_json>
 *      tags: [Uploads, MID Autorizaciones de Viaje]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/subirFotoTutorAutViaje'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post(
    '/subirFotoTutor',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_ci_tutor'),
    subirFotoTutor

);

/**
 * @swagger
 * components:
 *  schemas:
 *      guardarPersonaViaje:
 *          type: object
 *          properties:
 *            id_autorizacion_viaje:
 *                type: integer
 *                description: id de la autorización de viaje
 *            ci_usuario:
 *                type: string
 *                description: CI del usuario que está por aplicar la gestión
 *            estado:
 *                type: string
 *                description: Estado del registro
 *            transaccion:
 *                type: string
 *                description: Transacción que se aplicará
 *            id_persona_viaje:
 *                type: integer
 *                description: id de la persona que se agregará al viaje
 *            tipo_persona_viaje:
 *                type: string
 *                description: Tipo de persona que se agregará al viaje
 *            id_persona_nna:
 *                type: integer
 *                description: Id de la persona de la NNA
 *            tipo_parentezco:
 *                type: integer
 *                description: Id del tipo de parentesco
 *            parentesco_otro:
 *                type: string
 *                description: Descripción de otro parentesco
 *            edad:
 *                type: integer
 *                description: Edad del NNA
 *            id_persona:
 *                type: integer
 *                description: id de la persona
 *            url_ci_persona:
 *                type: string
 *                description: Foto del CI de las otras personas
 *          required:
 *              - transaccion
 *              - estado
 *              - login
 *          example:
 *                id_autorizacion_viaje: 1
 *                ci_usuario: 16021
 *                estado: CREADO
 *                transaccion: CREAR
 *                id_persona_viaje: 2
 *                tipo_persona_viaje: 45
 *                id_persona_nna: 5
 *                tipo_parentezco: 67
 *                parentesco_otro: Otro parentesco
 *                edad: 23
 *                id_persona: 55
 *                url_ci_persona: foto_persona.jpg
 */
/**
 * @swagger
 * /api/mid/guardarPersonaViaje:
 *  post:
 *      summary: Envía los datos para la gestión de Autorizaciones de viaje de una NNA (ABM), para NNA, Acompañantes y Testigos uno a la vez. El objeto en el request debe llamarse <v_json>
 *      tags: [Altas, Bajas, Modificaciones, MID Autorizaciones de Viaje]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/guardarPersonaViaje'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post(
    '/guardarPersonaViaje',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_ci_persona'),
    gestionAutorizacionesViaje

);
/**
 * @swagger
 * components:
 *  schemas:
 *      listarAutorizacionesViajeDna:
 *          type: object
 *          properties:
 *            ci_usuario:
 *                type: string
 *                description: CI del usuario que está solicitando la lista
 *            estado:
 *                type: string
 *                description: Estado del registro
 *          required:
 *              - ci_usuario
 *              - estado
 *          example:
 *                ci_usuario: 16021
 *                estado: CREADO
 */
/**
 * @swagger
 * /api/mid/listarAutorizacionesViajeDna:
 *  post:
 *      summary: Solicita un listado de autorizaciones de viaje segun el estado
 *      tags: [Listar, MID Autorizaciones de Viaje]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/listarAutorizacionesViajeDna'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post(
    '/listarAutorizacionesViajeDna',
    passport.authenticate('jwt',{session:false}),
    listarAutorizacionesViajeDna
);
/**
 * @swagger
 * /api/mid/obtenerAutorizacionViaje/{id}:
 *  get:
 *      summary: Obtiene datos de una autorización de viaje de acuerdo al id que se envia
 *      tags: [Listar, MID Autorizaciones de Viaje]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: id de la autorización de viaje
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *
 */
router.get(
    '/obtenerAutorizacionViaje/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerAutorizacionViaje
);
/**
 * @swagger
 * /api/mid/obtenerPersonasAutViaje/{tipo}/{id}:
 *  get:
 *      summary: Obtiene la lista de personas asociadas a una solicitud de viaje, segun el tipo que se solicita
 *      tags: [Listar, MID Autorizaciones de Viaje]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: tipo
 *             in: path
 *             description: tipo de persona
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *           - name: id
 *             in: path
 *             description: id de la autorización de viaje
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *
 */
router.get(
    '/obtenerPersonasAutViaje/:tipo/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerPersonasAutViaje
);
/**
 * @swagger
 * /api/mid/obtenerMunUsuario:
 *  get:
 *      summary: Obtiene el municipio del usuario para poder llenar la autorizacion de viaje
 *      tags: [Listar, Municipio, MID Autorizaciones de Viaje]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.get(
    '/obtenerMunUsuario/',
    passport.authenticate('jwt',{session:false}),
    obtenerMunUsuario
);
module.exports = router;
