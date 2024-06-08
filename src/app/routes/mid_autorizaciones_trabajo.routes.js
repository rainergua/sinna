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
    cambiarRequerimiento,
    subirDocumento,
    subirDocumentoAvaluar,
    listarAutorizacionesTrabajoPadres,
    listarSeguimientoLaboral,
    gestionSeguimientoLaboral
} = require ('../controllers/mid_autorizaciones_trabajo.controller')
const upload = require('../middlewares/fileUploadMiddleware');

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

router.post('/subirDocumento', 
    passport.authenticate('jwt', {session:false}), 
    upload.single('documento'),
    subirDocumento
);

router.post('/subirDocumentoAvaluar', 
    passport.authenticate('jwt', {session:false}), 
    upload.fields([
        { name: 'doc_valoracion_medica', maxCount: 1 },
        { name: 'doc_valoracion_socio_economica', maxCount: 1 },
        { name: 'doc_inpeccion_ocular', maxCount: 1 },
        { name: 'doc_actividad_prohibida', maxCount: 1 },
        { name: 'doc_actividad_derechos', maxCount: 1 }
    ]),
    subirDocumentoAvaluar
);

router.post(
    '/listarAutorizacionesTrabajoPadres',
    passport.authenticate('jwt',{session:false}),
    listarAutorizacionesTrabajoPadres
);

router.post(
    '/listarSeguimientoLaboral',
    passport.authenticate('jwt',{session:false}),
    listarSeguimientoLaboral
);

router.post(
    '/gestionSeguimientoLaboral', 
    passport.authenticate('jwt', {session:false}), 
    upload.single('adjunto'),
    gestionSeguimientoLaboral
);

module.exports = router;
