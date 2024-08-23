const express = require('express');
const passport =require('passport')
const { listaExpedientesMid,
    gestionExpedienteMid
} = require("../controllers/mid_expedientes_caso.controller");

const router = express.Router();


router.post('/gestionExpedienteMid',
    passport.authenticate('jwt',{session:false}),
    gestionExpedienteMid
);

router.get('/listaExpedientesMid/:id/:tipo',
    passport.authenticate('jwt',{session:false}),
    listaExpedientesMid
);

module.exports = router;