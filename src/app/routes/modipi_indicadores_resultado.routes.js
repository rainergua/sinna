const express = require('express');

const passport =require('passport')
const router = express.Router();
const {

    listarIndicadoresRes,
    gestionIndicadoresResultado,

} = require ('../controllers/modipi_indicadores_resultado.controller')
const upload = require("../middlewares/fileUploadMiddleware");

router.get(
    '/listarIndicadoresRes/:id',
    passport.authenticate('jwt',{session:false}),
    listarIndicadoresRes
);

router.post(
    '/gestionIndicadoresRes',
    passport.authenticate('jwt',{session:false}),
    gestionIndicadoresResultado
);


module.exports = router;
