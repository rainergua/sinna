const express = require('express');
const passport = require('passport');
const router = express.Router();
const { 
    parametricasFamilia, 
    gestionFamilia,
    mostrarFamilia,
    mostrarFamiliaNNA
} = require ('../controllers/comun_familiar.controller')

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
 * /api/familia/familia-parametricas:
 *  get:
 *      summary: Obtiene las parametricas para el registro de relaciones familiares
 *      tags: [Familia]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Petición Exitosa
 * 
 */
router.get('/familia-parametricas',
    passport.authenticate('jwt', {session:false}),
    parametricasFamilia,
);

/**
 * @swagger
 * components:
 *  schemas:     
 *      Familia:
 *          type: object
 *          properties:
 *              id_familiar:
 *                  type: integer
 *                  description: ID Familiar
 *              nna:
 *                  type: integer
 *                  description: ID NNA (Id persona)
 *              id_persona:
 *                  type: integer
 *                  description: ID Familiar (Id persona)
 *              relacion_familiar:
 *                  type: integer
 *                  description: Tipo de relación familiar (Parámetrica)
 *              id_centro:
 *                  type: integer
 *                  description: ID Centro
 *              direccion:
 *                  type: string
 *                  description: Dirección del familiar
 *              latitud:
 *                  type: string
 *                  description: Latitud de la dirección del familiar
 *              longitud:
 *                  type: string
 *                  description: Longitud de la dirección del familiar
 *              telefono:
 *                  type: string
 *                  description: Número telefónico del familiar
 *              observaciones:
 *                  type: text
 *                  description: Observaciones sobre el familiar
 *              transaccion:
 *                  type: string
 *                  description: CREAR_FAMILIA,EDITAR_FAMILIA,ELIMINAR_FAMILIA,RESTAURAR_FAMILIA
 *              estado:
 *                  type: string
 *                  description: INICIAL, CREADO, ELIMINADO
 *          required:
 *              - nna
 *              - estado
 *              - transaccion
 *          example:
 *              nna: 15
 *              id_persona: 12
 *              relacion_familiar: 40
 *              id_centro: null
 *              direccion: "Av. 6 de marzo esq. Av. Satélite N° 100"
 *              latitud: -16.510169
 *              longitud: -68.164667
 *              telefono: "22334455"
 *              observaciones: null
 *              id_creado_por: 2 
 *              fecha_creado: "2024-01-24 20:14:41.994237"
 *              id_modificado_por: null
 *              fecha_modificado: null
 *              estado: INICIAL
 *              transaccion: CREAR_FAMILIA
 */
/**
 * @swagger
 * /api/familia/familiar:
 *  post:
 *      summary: Envía los datos para la gestión de relaciones familiares (ABM). El objeto en el request debe llamarse <v_json>
 *      tags: [Familia]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/familiar', 
    passport.authenticate('jwt', {session:false}), 
    gestionFamilia
);

/**
 * @swagger
 * /api/familia/mostrar-familiar:
 *  post:
 *      summary: lista de relaciones familiares registradas en el SINNA
 *      tags: [Familia]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/mostrar-familiar', 
    passport.authenticate('jwt', {session:false}), 
    mostrarFamilia
);

/**
 * @swagger
 * /api/familia/mostrar-familiar-nna:
 *  post:
 *      summary: lista de relaciones familiares de cada NNA registradas en el SINNA
 *      tags: [Familia]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/mostrar-familiar-nna', 
    passport.authenticate('jwt', {session:false}), 
    mostrarFamiliaNNA
);

module.exports = router;