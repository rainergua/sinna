const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
   gestionAutorizacionesViaje, obtenerAutorizacionViaje, obtenerPersonasAutViaje, listarAutorizacionesViajeDna,
   subirFotoPadre, subirFotoMadre, subirFotoTutor
} = require ('../controllers/mid_autorizaciones_viaje.controller')
const upload = require("../middlewares/imageUploadMiddleware");


router.post(
    '/gestionAutorizacionesViaje',
    passport.authenticate('jwt',{session:false}),
    gestionAutorizacionesViaje
);

router.post(
    '/subirFotoPadre',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_ci_padre'),
    subirFotoPadre
);

router.post(
    '/subirFotoMadre',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_ci_madre'),
    subirFotoMadre
);

router.post(
    '/subirFotoTutor',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_ci_tutor'),
    subirFotoTutor

);

router.post(
    '/guardarPersonaViaje',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_ci_persona'),
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
