const express = require('express');

const passport =require('passport')
const {
    gestionCaso,
    listarCasosEstado,
    comboCasosAgrupar,
    listarPersonasCasos,
    gestionPersonasCaso,
    comboProfAtencionDna,
    lisstarAsignacionesCaso,
    gestionAsignacionesCaso,
    listarResolucionesNna,
    gestionResolucionesNna,
    listarAcogimientoCaso,
    gestionAcogimientoCaso,
    comboDenunciadosDemanda,
    listarDemandasCaso,
    gestionDemandasCaso,
    obtenerHistorialDemanda,
    obtenerConclusionesCaso
} = require("../controllers/mid_casos.controller");
const upload = require("../middlewares/fileUploadMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      gestionCaso:
 *          type: object
 *          properties:
 *              id_caso:
 *                  type: integer
 *                  description: Id del caso
 *              id_defensoria:
 *                  type: integer
 *                  description: Id de la DNA
 *              tipo_tipologia:
 *                  type: integer
 *                  description: Id de la tipologia del caso
 *              descripcion_caso:
 *                  type: string
 *                  description: Descripción del caso
 *              convencional:
 *                  type: boolean
 *                  description: Si el NNA es convencional
 *              id_persona_nna:
 *                  type: integer
 *                  description: Id de persona de la NNA
 *              latitud_hecho:
 *                  type: number
 *                  format: float
 *                  description: Latitud del hecho
 *              longitud_hecho:
 *                  type: number
 *                  format: float
 *                  description: Longitud del hecho
 *              direccion_hecho:
 *                  type: string
 *                  description: Dirección del hecho
 *              observaciones_caso:
 *                  type: string
 *                  description: Observaciones del caso
 *              cod_caso:
 *                  type: string
 *                  description: Codigo del caso
 *              fecha_denuncia:
 *                  type: string
 *                  format: date
 *                  description: Fecha de la denuncia
 *              tiene_denunciantes:
 *                  type: boolean
 *                  description: Si tiene denunciantes
 *              tiene_denunciados:
 *                  type: boolean
 *                  description: Si tiene denunciados
 *              tiene_familiares:
 *                  type: boolean
 *                  description: Si tiene familiares
 *              orientacion:
 *                  type: boolean
 *                  description: Si se trata de una orientación
 *              orientacion_nna_anonimo:
 *                  type: boolean
 *                  description: Si los datos de la NNA son anónimos
 *              edad_nna_anonimo:
 *                  type: integer
 *                  description: Edad de la NNA
 *              sexo_nna_anonimo:
 *                  type: integer
 *                  description: Sexo de la NNA
 *              vive_con_nna_anonimo:
 *                  type: array
 *                  items:
 *                      type: integer
 *                  description: Id de la parametrica de con quien vive la NNA
 *              poblacion_vulnerable_nna_anonimo:
 *                  type: array
 *                  items:
 *                      type: integer
 *                  description: Ids de la poblacion vulnerable a la que pertenece la NNA
 *              orientacion_solicitada_familiar:
 *                  type: boolean
 *                  description: Si la orientación fue solicitada por un familiar
 *              orientacion_nom_familiar:
 *                  type: string
 *                  description: Nombre del familiar para orientaciones
 *              tipo_orientacion_parentesco:
 *                  type: integer
 *                  description: Parentesco del familiar para orientaciones
 *              orientacion_fam_telefono:
 *                  type: string
 *                  description: Teléfono del familiar para orientaciones
 *              orientacion_fam_anonimo:
 *                  type: boolean
 *                  description: Si los datos del familiar son anónimos para orientaciones
 *              orientacion_otro_parentesco:
 *                  type: string
 *                  description: Descripción de otro parentesco para orientaciones
 *              tipo_cierre_caso:
 *                  type: integer
 *                  description: Tipo de cierre de caso
 *              filiacion_ci:
 *                  type: boolean
 *                  description: Si el caso indica que requiere CI para filiación
 *              filiacion_certificado:
 *                  type: boolean
 *                  description: Si el caso indica que requiere Certificado para filiación
 *              url_foto_extravio:
 *                  type: string
 *                  description: Foto de extravío
 *              nna_extraviado:
 *                  type: boolean
 *                  description: Si la NNA está extraviada
 *              id_caso_padre:
 *                  type: integer
 *                  description: Id del caso padre, para agrupaciones de caso
 *              foto_extravio_no:
 *                  type: boolean
 *                  description: Si no se cuenta con la foto de extravío
 *              agrupar_caso:
 *                  type: boolean
 *                  description: Si se agrupará el caso
 *              motivo_anonimo_nna:
 *                  type: string
 *                  description: Motivo por el que los datos de la NNA son anónimos para orientaciones
 *              motivo_anonimo_familiar:
 *                  type: string
 *                  description: Motivo por el que los datos del familiar son anónimos para orientaciones
 *              cerrarCaso:
 *                  type: boolean
 *                  description: Si se debe cerrar el caso
 *              resultado_rest_derecho:
 *                  type: integer
 *                  description: Id del resultado sobre vulneración de derechos del caso
 *              resultado_resolucion:
 *                  type: integer
 *                  description: Resultados sobre resoluciones del caso
 *              tabla:
 *                  type: string
 *                  description: Código de la tabla transaccional
 *              ci_usuario:
 *                  type: string
 *                  description: CI del usuario
 *              estado:
 *                  type: string
 *                  description: Estado del registro
 *              transaccion:
 *                  type: string
 *                  description: Transacción que se va a aplicar
 *              tipo_expediente:
 *                  type: string
 *                  description: Tipo de expediente
 *              tipo_conclusion:
 *                  type: integer
 *                  description: Tipo de conclusión
 *              descripcion_conclusion:
 *                  type: string
 *                  description: Descripción de la conclusión
 *              fecha_conclusion:
 *                  type: string
 *                  format: date
 *                  description: Fecha de la conclusión
 *          required:
 *              - id_caso
 *              - id_defensoria
 *              - tipo_tipologia
 *              - descripcion_caso
 *              - id_persona_nna
 *              - cod_caso
 *              - fecha_denuncia
 *              - tabla
 *              - ci_usuario
 *              - estado
 *              - transaccion
 *          example:
 *              id_caso: 1
 *              id_defensoria: 3
 *              tipo_tipologia: 45
 *              descripcion_caso: Describe el caso…
 *              convencional: false
 *              id_persona_nna: 101
 *              latitud_hecho: 12.2333
 *              longitud_hecho: 11.2344
 *              direccion_hecho: Calle 1 Nro 500 Zona Villa Bolivar
 *              observaciones_caso: Observaciones
 *              cod_caso: MID-CASO-1
 *              fecha_denuncia: "2024-03-15"
 *              tiene_denunciantes: true
 *              tiene_denunciados: true
 *              tiene_familiares: true
 *              orientacion: false
 *              orientacion_nna_anonimo: null
 *              edad_nna_anonimo: null
 *              sexo_nna_anonimo: null
 *              vive_con_nna_anonimo: null
 *              poblacion_vulnerable_nna_anonimo: null
 *              orientacion_solicitada_familiar: null
 *              orientacion_nom_familiar: null
 *              tipo_orientacion_parentesco: null
 *              orientacion_fam_telefono: null
 *              orientacion_fam_anonimo: null
 *              orientacion_otro_parentesco: null
 *              tipo_cierre_caso: 809
 *              filiacion_ci: false
 *              filiacion_certificado: false
 *              url_foto_extravio: foto_extravio.jpg
 *              nna_extraviado: true
 *              id_caso_padre: null
 *              foto_extravio_no: false
 *              agrupar_caso: false
 *              motivo_anonimo_nna: null
 *              motivo_anonimo_familiar: null
 *              cerrarCaso: false
 *              resultado_rest_derecho: 567
 *              resultado_resolucion: 566
 *              tabla: "36"
 *              ci_usuario: "16021"
 *              estado: INICIAL
 *              transaccion: CREAR
 *              tipo_expediente: "433"
 *              tipo_conclusion: 567
 *              descripcion_conclusion: Conclusion
 *              fecha_conclusion: "2024-03-15"
 */
/**
 * @swagger
 * /api/mid/gestionCaso:
 *  post:
 *      summary: Envía los datos para la gestión de Casos del MID (ABM). El objeto en el request debe llamarse <v_json>
 *      tags: [Altas, Bajas, Modificaciones, MID Casos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/gestionCaso'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post('/gestionCaso',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_foto_extravio'),
    gestionCaso
);
/**
 * @swagger
 * /api/mid/listarCasosEstado/{est}/{id}:
 *  get:
 *      summary: Obtiene listado de casos segun el estado y el id de la DNA con id = ${est} y id = ${id}
 *      tags: [Listar, MID Casos]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: est
 *             in: path
 *             description: estado que se solicita
 *             required: true
 *             schema:
 *                  type: string
 *                  style: simple
 *           - name: id
 *             in: path
 *             description: Id de la DNA
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *
 */

router.get(
    '/listarCasosEstado/:est/:id',
    passport.authenticate('jwt', {session:false}),
    listarCasosEstado
);
/**
 * @swagger
 * /api/mid/comboCasosAgrupar/{dna}/{id}:
 *  get:
 *      summary: Obtiene listado de casos que estan activos a los que se puede agrupar un caso
 *      tags: [Listar, MID Casos]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: dna
 *             in: path
 *             description: id de la DNA
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *           - name: id
 *             in: path
 *             description: Id del caso
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *
 */
router.get(
    '/comboCasosAgrupar/:dna/:id',
    passport.authenticate('jwt', {session:false}),
    comboCasosAgrupar
);

/**
 * @swagger
 * /api/mid/listarPersonasCasos/{c}/{t}:
 *  get:
 *      summary: Obtiene listado personas que son parte del caso, denunciantes, denunciados
 *      tags: [Listar, MID Casos]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: c
 *             in: path
 *             description: id del caso
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *           - name: t
 *             in: path
 *             description: Id del tipo de persona
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *
 */
router.get(
    '/listarPersonasCasos/:c/:t',
    passport.authenticate('jwt', {session:false}),
    listarPersonasCasos
);

/**
 * @swagger
 * components:
 *  schemas:
 *      gestionPersonasCaso:
 *          type: object
 *          properties:
 *              id_den:
 *                  type: integer
 *                  description: Id de la persona del caso
 *              id_caso:
 *                  type: integer
 *                  description: Id del caso
 *              tipo_persona:
 *                  type: integer
 *                  description: Id del tipo de persona
 *              institucion:
 *                  type: string
 *                  description: Nombre de la institución
 *              como_llego_denuncia:
 *                  type: string
 *                  description: Descripción de cómo llegó la denuncia
 *              id_persona:
 *                  type: integer
 *                  description: Id de la persona
 *              relacion_parentesco:
 *                  type: integer
 *                  description: Id del tipo de parentesco
 *              tipo_denunciante:
 *                  type: integer
 *                  description: Id del tipo de denunciante
 *              tipo_denunciado:
 *                  type: integer
 *                  description: Id del tipo de denunciado
 *              observaciones_denunciado:
 *                  type: string
 *                  description: Observaciones sobre el denunciado
 *              sexo:
 *                  type: integer
 *                  description: Sexo de la persona
 *              ci_usuario:
 *                  type: string
 *                  description: CI del usuario que registra
 *              estado:
 *                  type: string
 *                  description: Estado del registro
 *              transaccion:
 *                  type: string
 *                  description: Transacción que se aplicará
 *          required:
 *              - id_den
 *              - id_caso
 *              - tipo_persona
 *              - id_persona
 *              - relacion_parentesco
 *              - sexo
 *              - ci_usuario
 *              - estado
 *              - transaccion
 *          example:
 *              id_den: 34
 *              id_caso: 2
 *              tipo_persona: 543
 *              institucion: EMAPA S.A.
 *              como_llego_denuncia: Se encontró a un niño
 *              id_persona: 56
 *              relacion_parentesco: 23
 *              tipo_denunciante: 345
 *              tipo_denunciado: 378
 *              observaciones_denunciado: Observaciones
 *              sexo: 16
 *              ci_usuario: "16021"
 *              estado: CREADO
 *              transaccion: CREAR
 */
/**
 * @swagger
 * /api/mid/gestionPersonasCaso:
 *  post:
 *      summary: Envía los datos para las gestión de Personas del caso del MID (ABM). El objeto en el request debe llamarse <v_json>
 *      tags: [Altas, Bajas, Modificaciones, MID Casos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/gestionPersonasCaso'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *
 */
router.post('/gestionPersonasCaso',
    passport.authenticate('jwt',{session:false}),
    gestionPersonasCaso
);

router.get(
    '/comboProfAtencionDna/:dna',
    passport.authenticate('jwt', {session:false}),
    comboProfAtencionDna
);

router.get(
    '/lisstarAsignacionesCaso/:id',
    passport.authenticate('jwt', {session:false}),
    lisstarAsignacionesCaso
);

router.post('/gestionAsignacionesCaso',
    passport.authenticate('jwt',{session:false}),
    gestionAsignacionesCaso
);

router.get(
    '/listarResolucionesNna/:id',
    passport.authenticate('jwt', {session:false}),
    listarResolucionesNna
);

router.post('/gestionResolucionesNna',
    passport.authenticate('jwt',{session:false}),
    gestionResolucionesNna
);


router.get(
    '/listarAcogimientoCaso/:caso',
    passport.authenticate('jwt', {session:false}),
    listarAcogimientoCaso
);

router.post('/gestionAcogimientoCaso',
    passport.authenticate('jwt',{session:false}),
    gestionAcogimientoCaso
);

router.get(
    '/comboDenunciadosDemanda/:caso',
    passport.authenticate('jwt', {session:false}),
    comboDenunciadosDemanda
);

router.get(
    '/listarDemandasCaso/:caso',
    passport.authenticate('jwt', {session:false}),
    listarDemandasCaso
);

router.post('/gestionDemandasCaso',
    passport.authenticate('jwt',{session:false}),
    gestionDemandasCaso
);

router.get('/obtenerHistorialDemanda/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerHistorialDemanda
);

router.get('/obtenerConclusionesCaso/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerConclusionesCaso
);


module.exports = router;