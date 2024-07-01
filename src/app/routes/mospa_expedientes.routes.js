const express = require('express');
const passport =require('passport')
const { obtenerDatosBase, gestionExpediente, comboExpediente, listaExpediente
} = require("../controllers/mospa_expedientes.controller");

const router = express.Router();

router.get('/comboExpediente/:id',
    passport.authenticate('jwt',{session:false}),
    comboExpediente
);

router.get('/obtenerDatosBase/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerDatosBase
);

router.post('/gestionExpediente',
    passport.authenticate('jwt',{session:false}),
    gestionExpediente
);

router.get('/listaExpediente/:id/:tipo',
    passport.authenticate('jwt',{session:false}),
    listaExpediente
);

module.exports = router;