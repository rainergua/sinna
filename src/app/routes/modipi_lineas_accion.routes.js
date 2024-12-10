const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarLineasAccion,
    gestionLineasAccion
} = require ('../controllers/modipi_lineas_accion.controller')

router.get(
    '/listarLineasAccion/:est/:id_resp/:l',
    passport.authenticate('jwt',{session:false}),
    listarLineasAccion
);

router.post(
    '/gestionLineasAccion',
    passport.authenticate('jwt',{session:false}),
    gestionLineasAccion
);



module.exports = router;
