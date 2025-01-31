const express = require('express');

const passport =require('passport')
const {
    gestionCasoMoliv,
    listarCasosEstado,

} = require("../controllers/moliv_casos.controller");
const upload = require("../middlewares/fileUploadMiddleware");

const router = express.Router();

router.post('/gestionCasoMoliv',
    passport.authenticate('jwt',{session:false}),
    gestionCasoMoliv
);


router.get(
    '/listarCasosMolivEstado/:est/:id',
    passport.authenticate('jwt', {session:false}),
    listarCasosEstado
);


module.exports = router;