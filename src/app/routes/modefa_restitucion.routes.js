const express = require('express');
const passport =require('passport')
const { obtenerDatosBase, comboExpediente, gestionRestitucion, listaRestitucion
} = require("../controllers/modefa_restitucion.controller");

const router = express.Router();

router.get('/comboExpediente/:id',
    passport.authenticate('jwt',{session:false}),
    comboExpediente
);

router.get('/obtenerDatosBase/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerDatosBase
);

router.post('/gestionRestitucion',
    passport.authenticate('jwt',{session:false}),
    gestionRestitucion
);

router.get('/listaRestitucion/:id/:tipo',
    passport.authenticate('jwt',{session:false}),
    listaRestitucion
);

module.exports = router;