const express = require('express');

const passport =require('passport')
const {getParametricasIngresos, obtenerPersona, gestionMovimientos, gestionPersonasDetalle, listarMovimientos,
    obtieneMunicipioDpto, obtieneCentrosDestino, subirFotoAdolescente
} = require("../controllers/mospa_movimientos.controller");
const upload = require("../middlewares/imageUploadMiddleware");

const router = express.Router();

/**
 * @swagger
 */

router.get('/movimientos-parametrica',
    passport.authenticate('jwt', {session:false}),
    getParametricasIngresos
);

router.get('/obtenerPersona/:buscar',
    passport.authenticate('jwt',{session:false}),
    obtenerPersona
);

router.post('/gestionMovimientos',
    passport.authenticate('jwt',{session:false}),
    gestionMovimientos
);

router.post('/gestionPersonasDetalle',
    passport.authenticate('jwt',{session:false}),
    gestionPersonasDetalle
);

router.post('/listarMovimientos',
    passport.authenticate('jwt',{session:false}),
    listarMovimientos
);

router.post('/obtieneMunicipioDpto',
    passport.authenticate('jwt',{session:false}),
    obtieneMunicipioDpto
);


router.post('/obtieneCentrosDestino',
    passport.authenticate('jwt',{session:false}),
    obtieneCentrosDestino
);

router.post(
    '/subirFotoAdolescente',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_foto_adolescente'),
    subirFotoAdolescente
);


module.exports = router;