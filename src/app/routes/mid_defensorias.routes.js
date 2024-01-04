const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();
const { 
    gestionDefensoria,
    obtieneDepto,
    obtieneProv,
    getToken,
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
 * /api/mid/gestiondef:
 *  post:
 *      summary: Envía los datos para la gestión de Defensorias (ABM). El obejto en el request debe llarse <v_json>
 *      tags: [Alatas, Bajhas, Modificaciones]
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

router.post('/gestiondef', verificaToken,gestionDefensoria);

/**
 * @swagger
 * /api/mid/obtienedepto:
 *  get:
 *      summary: Obtiene los departamentos de Pais
 *      tags: [departamentos]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/obtienedepto', obtieneDepto);
/**
 * @swagger
 * /api/mid/obtieneprov/{id}:
 *  get:
 *      summary: Obtiene las provincias de un departamento
 *      tags: [departamentos]
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
router.get('/obtieneprov/:id', obtieneProv);

/*router.get('/gettoken', getToken);*/

//router.post('/gettoken', getToken);


//router.put('/gettoken', getToken);
module.exports = router;
