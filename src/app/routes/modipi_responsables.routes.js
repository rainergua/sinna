const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarResponsables, gestionResponsables, listarResponsablesUsuario
} = require ('../controllers/modipi_responsables.controller')
const {getMe} = require("../controllers/auth.controller");
const {listaCentrosUsuario} = require("../controllers/mospa.controller");

router.post(
    '/listarResponsables',
    passport.authenticate('jwt',{session:false}),
    listarResponsables
);

router.post(
    '/gestionResponsables',
    passport.authenticate('jwt',{session:false}),
    gestionResponsables
);

router.get(
    '/listarResponsablesUsuario',
    passport.authenticate('jwt',{session:false}),
    listarResponsablesUsuario
);


module.exports = router;
