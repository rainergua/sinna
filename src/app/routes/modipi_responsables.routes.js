const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarResponsables, gestionResponsables, listarResponsablesUsuario, comboResponsablesPadre
} = require ('../controllers/modipi_responsables.controller')
const {getMe} = require("../controllers/auth.controller");
const {listaCentrosUsuario} = require("../controllers/mospa.controller");

router.get(
    '/listarResponsables/:est',
    passport.authenticate('jwt',{session:false}),
    listarResponsables
);

router.get(
    '/comboResponsablesPadre/:id/:t',
    passport.authenticate('jwt',{session:false}),
    comboResponsablesPadre
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
