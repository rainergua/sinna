const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();

const { 
    getPersonaCi
} = require ('../controllers/comun.controller')

/**
 * @swagger
 * /api/comun/getpersonaci/{ci}:
 *  get:
 *      summary: Obtiene a una persona enviando el núimero de carnet
 *      tags: [Comun]
 *      responses:
 *          200:
 *              description: Peticion 
 *      parameters:
 *           - name: ci
 *             in: path
 *             description: Cedula de Identidad
 *             required: true
 *             schema:
 *                  type: integer  
 *                  style: simple
 * 
 */
router.get('/getpersonaci/:ci', getPersonaCi);

module.exports = router;
