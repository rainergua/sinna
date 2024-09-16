const express = require('express');
const passport =require('passport')
const { historialIngresos, historialTransferencias, historialEgresos } = require("../controllers/modefa_historial_nna.controller");

const router = express.Router();

router.get('/historialIngresos/:id',
    passport.authenticate('jwt',{session:false}),
    historialIngresos
);

router.get('/historialTransferencias/:id',
    passport.authenticate('jwt',{session:false}),
    historialTransferencias
);

router.get('/historialEgresos/:id',
    passport.authenticate('jwt',{session:false}),
    historialEgresos
);

module.exports = router;