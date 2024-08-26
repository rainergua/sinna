const express = require('express');
const passport =require('passport')
const { obtenerDatosBase, comboExpediente, gestionMayoriaEdad, listaMayoriaEdad
} = require("../controllers/modefa_mayoria_edad.controller");

const router = express.Router();

router.get('/comboExpediente/:id',
    passport.authenticate('jwt',{session:false}),
    comboExpediente
);

router.get('/obtenerDatosBase/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerDatosBase
);

router.post('/gestionMayoriaEdad',
    passport.authenticate('jwt',{session:false}),
    gestionMayoriaEdad
);

router.get('/listaMayoriaEdad/:id/:tipo',
    passport.authenticate('jwt',{session:false}),
    listaMayoriaEdad
);

module.exports = router;