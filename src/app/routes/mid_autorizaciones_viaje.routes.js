const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
   gestionAutorizacionesViaje, obtenerAutorizacionViaje, obtenerPersonasAutViaje
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

router.get(
    '/obtenerPersonasAutViaje/:tipo/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerPersonasAutViaje
);
module.exports = router;
