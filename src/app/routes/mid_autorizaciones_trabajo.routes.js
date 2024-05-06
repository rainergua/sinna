const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarAutorizacionesTrabajo
} = require ('../controllers/mid_autorizaciones_trabajo.controller')


router.post(
    '/listarAutorizacionesTrabajo',
    passport.authenticate('jwt',{session:false}),
    listarAutorizacionesTrabajo
);

module.exports = router;
