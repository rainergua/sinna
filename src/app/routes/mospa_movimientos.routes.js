const express = require('express');

const passport =require('passport')
const {getParametricasIngresos, obtenerPersona} = require("../controllers/mospa_movimientos.controller");
const router = express.Router();

/**
 * @swagger
 */

router.get('/movimientos-parametrica',
    passport.authenticate('jwt', {session:false}),
    getParametricasIngresos
);

router.post('/obtenerPersona',
    passport.authenticate('jwt',{session:false}),
    obtenerPersona
);

module.exports = router;