const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarDocumentos, gestionDocumentos, obtenerCamposDocumentos, listarTablasTransaccionales,
    listarTransaccionesTabla, gestionDatosDocumentos, obtenerDatosPlantilla, listEsquemas,
    listFunciones, obtenerCamposFuncion
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


router.get(
    '/obtenerCamposDocumentos/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerCamposDocumentos
);
/*
router.get(
    '/obtenerCamposTabla/:tabla',
    passport.authenticate('jwt',{session:false}),
    obtenerCamposTabla
);*/

router.get(
    '/obtenerCamposFuncion/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerCamposFuncion
);

router.post(
    '/gestionDatosDocumentos',
    passport.authenticate('jwt',{session:false}),
    gestionDatosDocumentos
);

router.get(
    '/obtenerDatosPlantilla/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerDatosPlantilla
);

router.get(
    '/listEsquemas',
    passport.authenticate('jwt',{session:false}),
    listEsquemas
);

router.get(
    '/listFunciones/:esquema',
    passport.authenticate('jwt',{session:false}),
    listFunciones
);
module.exports = router;
