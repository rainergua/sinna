const express = require('express');

const passport =require('passport')
const {getParametricasIngresos, obtenerPersona, gestionMovimientos, gestionPersonasDetalle} = require("../controllers/mospa_movimientos.controller");


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




module.exports = router;