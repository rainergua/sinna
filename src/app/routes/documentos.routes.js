const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarDocumentos, gestionDocumentos, obtenerCamposDocumentos, gestionCamposDocumentos, listarTablasTransaccionales,
    listarTransaccionesTabla
} = require ('../controllers/documentos.controller')

router.post(
    '/listarDocumentos',
    passport.authenticate('jwt',{session:false}),
    listarDocumentos
);

router.get(
    '/listarTablasTransaccionales/:modulo',
    passport.authenticate('jwt',{session:false}),
    listarTablasTransaccionales
);

router.get(
    '/listarTransaccionesTabla/:id',
    passport.authenticate('jwt',{session:false}),
    listarTransaccionesTabla
);

router.post(
    '/gestionDocumentos',
    passport.authenticate('jwt',{session:false}),
    gestionDocumentos
);

/*
router.get(
    '/obtenerCamposDocumentos/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerCamposDocumentos
);

router.get(
    '/gestionCamposDocumentos',
    passport.authenticate('jwt',{session:false}),
    gestionCamposDocumentos
);*/

module.exports = router;
