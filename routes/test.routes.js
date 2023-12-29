const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();
const { 
    test,
    testdb, 
    testdbres,
    getToken,
} = require ('../controllers/test.controller')

/**
 * @swagger
 * components:
 *  schemas:
 *      Prueba:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the user name
 *              age:
 *                  type: integer
 *                  description: the user age
 *              email:
 *                  type: string
 *                  description: the user email
 *          required:
 *              - name
 *              - age
 *              - email
 *          example:
 *              name: Alan Parrish
 *              age: 70
 *              email: alan@email.com
 */
/**
 * @swagger
 * /api/test/1:
 *  post:
 *      summary: Muestra un ejemplo de interaccion con una api de pokemon
 *      tags: [Prueba]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Prueba'
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
/**
 * @swagger
 * /api/test:
 *  get:
 *      summary: Muestra un ejemplo de interaccion con una api de pokemon
 *      tags: [Prueba]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Prueba'
 * 
 */
router.get('/test', test);

router.get('/testdb', testdb);

router.get('/testdbres', verificaToken, testdbres);

router.get('/gettoken', getToken);

//router.post('/gettoken', getToken);


//router.put('/gettoken', getToken);
module.exports = router;
