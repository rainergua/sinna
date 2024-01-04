const express = require('express');
const router = express.Router();
const { 
    getParametricas,
    getTerritorio,
    gestionCentroAcogida,
    listaCentroAcogida,
} = require ('../controllers/modefa_centros_acogimiento.controller')

/**
 * @swagger
 * /api/modefa/centro-parametricas:
 *  get:
 *      summary: Obtiene las parametricas para el registro de centros de acogida
 *      tags: [centros_acogimiento]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/centro-parametricas', getParametricas);

/**
 * @swagger
 * /api/modefa/territorio/{ine}/{nivel}:
 *  get:
 *      summary: Obtiene datos de acuerdo al nivel de territorio y codigo ine
 *      tags: [centros_acogimiento]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: ine
 *             in: path
 *             description: codigo ine
 *             required: true
 *             schema:
 *                  type: string
 *                  style: simple
 *           - name: nivel
 *             in: path
 *             description: nivel del territorio
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 * 
 */
router.get('/territorio/:ine/:nivel', getTerritorio);

/**
 * @swagger
 * components:
 *  schemas:
 *      centro-acogida:
 *          type: object
 *          properties:
 *              id_centro:
 *                  type: integer
 *                  description: id del centro
 *              nombre:
 *                  type: string
 *                  description: nombre del centro
 *              nit:
 *                  type: string
 *                  description: NIT del centro
 *              descripcion:
 *                  type: string
 *                  description: Breve descripción del centro
 *              ubicacion:
 *                  type: string
 *                  description: Ubicación del centro
 *              direccion:
 *                  type: string
 *                  description: dirección del centro
 *              telefono:
 *                  type: string
 *                  description: Número telefónico del centro
 *              celular:
 *                  type: string
 *                  description: Número de celular del centro
 *              email:
 *                  type: string
 *                  description: Email del centro
 *              website:
 *                  type: string
 *                  description: Web site del centro
 *              departamento:
 *                  type: string
 *                  description: codigo INE del departamento
 *              municipio:
 *                  type: string
 *                  description: codigo INE del municipio
 *              capacidad:
 *                  type: integer
 *                  description: codigo INE del municipio
 *              responsable:
 *                  type: string
 *                  description: nombre del responsable
 *              tipo_administracion_centro:
 *                  type: integer
 *                  description: ID del tipo del centro
 *              rango_edad:
 *                  type: integer
 *                  description: ID de Rango de edad
 *              sexo:
 *                  type: integer
 *                  description: Id del genero
 *              fotografía:
 *                  type: string
 *                  description: Pendiente
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
 *              id_centro: 1
 *              nombre: Centro Nuevo
 *              nit: 4785447017
 *              descripcion: descripción del centro
 *              direccion: dirección del centro
 *              ubicacion: Calle nueva
 *              telefono: 2546687
 *              celular: 76254277
 *              email: centro@gmail.com
 *              website: http://www.centro.com
 *              departamento: "010000"
 *              municipio: "010101"
 *              capacidad: 100
 *              responsable: Nombre
 *              tipo_administracion_centro: 7
 *              rango_edad: 11
 *              sexo: 16
 *              fotografia:
 *              transaccion: CREAR_CDA
 *              estado: ACTIVO
 *              login: 1
 */
/**
 * @swagger
 * /api/modefa/centro-acogida:
 *  post:
 *      summary: Envía los datos para la gestión de Centros de Acogida (ABM). El objeto en el request debe llamarse <v_json>
 *      tags: [centros_acogimiento]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/centro-acogida'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/centro-acogida', gestionCentroAcogida);

/**
 * @swagger
 * /api/modefa/list-centro-acogida:
 *  post:
 *      summary: lista de los centros de acogida registrados
 *      tags: [centros_acogimiento]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.post('/list-centro-acogida', listaCentroAcogida);


module.exports = router;




