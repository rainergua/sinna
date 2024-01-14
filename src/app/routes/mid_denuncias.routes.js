const express = require('express');
const router = express.Router();

const  upload = require ('../middlewares/imageUploadMiddleware')
const { 
    getParametrosDenuncia,
    gestionDenuncias,
    obtieneDenuncias,
    obtieneDen,
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

router.post('/gestiondenuncias', gestionDenuncias);

router.get('/obtienedenuncias', obtieneDenuncias);

router.get('/obtieneden/:id', obtieneDen);

module.exports = router;
