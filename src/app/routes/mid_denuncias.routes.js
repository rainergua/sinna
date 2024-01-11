const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();

const  upload = require ('../middlewares/imageUploadMiddleware')
const { 
    getParametrosDenuncia
} = require ('../controllers/mid_denuncias.controller')

/**
 * @swagger
 * /api/mid/obtieneparametros:
 *  get:
 *      summary: Obtieneparametros para el formulario de denuncias
 *      tags: [Denuncias]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 * 
 */
router.get('/obtieneparametros', getParametrosDenuncia);

module.exports = router;
