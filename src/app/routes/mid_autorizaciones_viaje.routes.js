const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
   gestionAutorizacionesViaje, obtenerAutorizacionViaje
} = require ('../controllers/mid_autorizaciones_viaje.controller')


router.post(
    '/gestionAutorizacionesViaje',
    passport.authenticate('jwt',{session:false}),
    gestionAutorizacionesViaje
);

router.get(
    '/obtenerAutorizacionViaje/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerAutorizacionViaje
);

/*
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

router.get(
    '/obtenerCamposTabla/:tabla',
    passport.authenticate('jwt',{session:false}),
    obtenerCamposTabla
);
*/


module.exports = router;
