const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
   gestionAutorizacionesViaje, obtenerAutorizacionViaje, obtenerPersonasAutViaje, listarAutorizacionesViajeDna
} = require ('../controllers/mid_autorizaciones_viaje.controller')


router.post(
    '/gestionAutorizacionesViaje',
    passport.authenticate('jwt',{session:false}),
    gestionAutorizacionesViaje
);

router.post(
    '/listarAutorizacionesViajeDna',
    passport.authenticate('jwt',{session:false}),
    listarAutorizacionesViajeDna
);

router.get(
    '/obtenerAutorizacionViaje/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerAutorizacionViaje
);

router.get(
    '/obtenerPersonasAutViaje/:tipo/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerPersonasAutViaje
);
module.exports = router;
