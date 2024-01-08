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
 * /api/modefa/territorio/{id}:
 *  get:
 *      summary: Obtiene datos de acuerdo al id_parametro_padre
 *      tags: [centros_acogimiento]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: Llave padre 
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 * 
 */
router.get('/territorio/:id', getTerritorio);

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
 *              acreditacion:
 *                  type: string
 *                  description: acreditacion del centro
 *              descripcion:
 *                  type: string
 *                  description: Breve descripción del centro
 *              latitud:
 *                  type: string
 *                  description: Ubicación del centro
 *              longitud:
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
 *              id_departamento:
 *                  type: string
 *                  description: codigo id del departamento
 *              id_municipio:
 *                  type: string
 *                  description: codigo id del municipio
 *              capacidad:
 *                  type: integer
 *                  description: Capacidad del centro
 *              responsable:
 *                  type: string
 *                  description: nombre del responsable
 *              id_tipo_administracion_centro:
 *                  type: integer
 *                  description: ID del tipo del centro
 *              id_rango_edad:
 *                  type: integer
 *                  description: ID de Rango de edad
 *              id_sexo:
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
 *              acreditacion: 4785447017
 *              descripcion: descripción del centro
 *              direccion: dirección del centro
 *              latitud: -16.50154931432432, 
 *              longitud: -68.14037510816706,
 *              telefono: 2546687
 *              celular: 76254277
 *              email: centro@gmail.com
 *              website: http://www.centro.com
 *              id_departamento: 3
 *              id_municipio: 152
 *              capacidad: 100
 *              responsable: Nombre
 *              id_tipo_administracion_centro: 7
 *              id_rango_edad: 11
 *              id_sexo: 16
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




