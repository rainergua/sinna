const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarAutorizacionesTrabajo,
    getBuscarEstablecimiento,
    gestionEstablecimiento,
    gestionAutorizacionTrabajo,
    gestionAutorizacionTrabajoPadres,
    listarRequisitosTrabajo,
    cambiarRequerimiento
} = require ('../controllers/mid_autorizaciones_trabajo.controller')


router.post(
    '/listarAutorizacionesTrabajo',
    passport.authenticate('jwt',{session:false}),
    listarAutorizacionesTrabajo
);

router.get('/buscar-establecimiento/:buscar',
    passport.authenticate('jwt', {session:false}), 
    getBuscarEstablecimiento
);

router.post('/gestionEstablecimiento', 
    passport.authenticate('jwt', {session:false}), 
    gestionEstablecimiento
);

router.post('/gestionAutorizacionTrabajo', 
    passport.authenticate('jwt', {session:false}), 
    gestionAutorizacionTrabajo
);

router.post('/gestionAutorizacionTrabajoPadres', 
    passport.authenticate('jwt', {session:false}), 
    gestionAutorizacionTrabajoPadres
);

router.get('/listarRequisitosTrabajo/:id', 
    passport.authenticate('jwt', {session:false}), 
    listarRequisitosTrabajo
);

router.get('/cambiarRequerimiento/:id/:requerimiento', 
    passport.authenticate('jwt', {session:false}), 
    cambiarRequerimiento
);

module.exports = router;
