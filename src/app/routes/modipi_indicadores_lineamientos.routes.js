const express = require('express');

const passport =require('passport')
const router = express.Router();

const {
    listarIndicadoresLineamiento,
    gestionIndicadores, listarAvancesIndicador
} = require("../controllers/modipi_indicadores_lineamientos.controller");

router.get(
    '/listarIndicadoresLineamiento/:est/:id',
    passport.authenticate('jwt',{session:false}),
    listarIndicadoresLineamiento
);

router.post(
    '/gestionIndicadores',
    passport.authenticate('jwt',{session:false}),
    gestionIndicadores
);

router.get(
    '/listarAvancesIndicador/:id',
    passport.authenticate('jwt',{session:false}),
    listarAvancesIndicador
);


module.exports = router;
