const express = require('express');

const passport =require('passport')
const {
    gestionCaso,
    listarCasosEstado,
    comboCasosAgrupar,
    listarPersonasCasos,
    gestionPersonasCaso,
    comboProfAtencionDna
} = require("../controllers/mid_casos.controller");
const upload = require("../middlewares/fileUploadMiddleware");

const router = express.Router();

/**
 * @swagger
 */


router.post('/gestionCaso',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_foto_extravio'),
    gestionCaso
);


router.get(
    '/listarCasosEstado/:est/:id',
    passport.authenticate('jwt', {session:false}),
    listarCasosEstado
);

router.get(
    '/comboCasosAgrupar/:dna/:id',
    passport.authenticate('jwt', {session:false}),
    comboCasosAgrupar
);


router.get(
    '/listarPersonasCasos/:c/:t',
    passport.authenticate('jwt', {session:false}),
    listarPersonasCasos
);

router.post('/gestionPersonasCaso',
    passport.authenticate('jwt',{session:false}),
    gestionPersonasCaso
);

router.get(
    '/comboProfAtencionDna/:dna',
    passport.authenticate('jwt', {session:false}),
    comboProfAtencionDna
);


module.exports = router;