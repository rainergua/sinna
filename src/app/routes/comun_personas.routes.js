const express = require('express');
const passport = require('passport');
const router = express.Router();
const { 
    getParametricas,
    gestionPersona,
    mostrarPersona
} = require ('../controllers/comun_personas.controller')

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
 * /api/persona-parametricas:
 *  get:
 *      summary: Obtiene las parametricas para el registro de personas
 *      tags: [personas]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Petición Exitosa
 * 
 */
router.get('/persona-parametricas',
    passport.authenticate('jwt', {session:false}),
    getParametricas
);

/**
 * @swagger
 * components:
 *  schemas:    
 *      com_personas:
 *          type: object
 *          properties:
 *              id_persona:
 *                  type: integer
 *                  description: ID Persona
 *              convencional:
 *                  type: boolean
 *                  description: NNA Convencional
 *              primer_apellido:
 *                  type: string
 *                  description: Primer apellido de la persona
 *              segundo_apellido:
 *                  type: string
 *                  description: Segundo apellido de la persona
 *              nombres:
 *                  type: string
 *                  description: Nombres de la persona
 *              tipo_fecha_nac:
 *                  type: integer
 *                  description: Tipo de fecha de nacimiento
 *              fecha_nac:
 *                  type: date
 *                  description: Fecha de nacimiento
 *              lugar_nac:
 *                  type: string
 *                  description: Lugar de nacimiento
 *              ci:
 *                  type: integer
 *                  description: Cédula de identidad
 *              ci_ext:
 *                  type: string
 *                  description: Cédula de identidad (extensión)
 *              ci_exp:
 *                  type: integer
 *                  description: Cédula de identidad (expedición)
 *              vulnerabilidad:
 *                  type: integer
 *                  description: Situación de vulnerabilidad de la persona
 *              direccion:
 *                  type: string
 *                  description: Dirección de la persona
 *              latitud:
 *                  type: string
 *                  description: Latitud de la dirección de la persona
 *              longitud:
 *                  type: string
 *                  description: Longitud de la dirección de la persona
 *              telefono:
 *                  type: string
 *                  description: Número telefónico de la persona
 *              celular:
 *                  type: string
 *                  description: Número de celular de la persona
 *              fotografia:
 *                  type: string
 *                  description: Fotografía de la persona
 *              sexo:
 *                  type: integer
 *                  description: Género de la persona
 *              segip:
 *                  type: boolean
 *                  description: Persona registrada en el SEGIP
 *              instruccion:
 *                  type: integer
 *                  description: Nivel de instrucción de la persona
 *              e_civil:
 *                  type: integer
 *                  description: Estado civil de la persona
 *              ocupacion:
 *                  type: integer
 *                  description: Ocupación de la persona
 *              vive_con:
 *                  type: integer
 *                  description: Con quien vive la persona
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
 *              - transaccion
 *              - estado
 *              - login
 *          example:
 *              id_persona: 4
 *              convencional: false
 *              primer_apellido: Bautista
 *              segundo_apellido: Montaño
 *              nombres: Jaime
 *              tipo_fecha_nac: 19
 *              fecha_nac: 2014-09-22
 *              lugar_nac: "El Alto, La Paz"
 *              ci: 9999999
 *              ci_ext: null
 *              ci_exp: 3
 *              vulnerabilidad: 230
 *              direccion: "Av. 6 de marzo entre calles 5 y 6. V. Dolores"
 *              latitud: -16.510169
 *              longitud: -68.164667
 *              telefono: 2919191
 *              celular: null
 *              fotografia: null
 *              sexo: 16
 *              segip: false
 *              instruccion: null
 *              e_civil: null
 *              ocupacion: null
 *              vive_con: null
 *              id_creado_por: 2 
 *              fecha_creado: "2024-01-11 20:14:41.994237"
 *              id_modificado_por: null
 *              fecha_modificado: null
 *              estado: CREADO
 *              transaccion: CREAR_PERSONA
 *              login: 1
 */
/**
 * @swagger
 * /api/persona:
 *  post:
 *      summary: Envía los datos para la gestión de personas (ABM). El objeto en el request debe llamarse <v_json>
 *      tags: [personas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/personas'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/persona', gestionPersona);

/**
 * @swagger
 * /api/mostrar-persona:
 *  post:
 *      summary: lista de personas registradas en el SINNA
 *      tags: [personas]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/mostrar-persona', mostrarPersona);


module.exports = router;