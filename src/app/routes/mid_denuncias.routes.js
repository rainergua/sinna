const express = require('express');
const passport = require('passport');
const router = express.Router();
const { 
    getParametrosDenuncia,
    getMunicipioProvDep,
    gestionDenuncias,
    obtieneDenuncias,
    obtieneDen,
    guardaFam,
    obtieneFamiliares,
    obtienedendo,
    obtienedatosPrint,
    historialDenunciaNNA,
    historialDenunciaDenunciado,
    obtienedente,
    guardaDenPer,
    obtieneProfesionalDNA,
    obtieneProfesionalredes,
    derivarCaso, 
    obtieneDatosDashboard,
    listarDenunciasEstado,
    guardaOrientacionFamilia,
    getOrientacion
} = require ('../controllers/mid_denuncias.controller')


router.get('/obtieneparametros', passport.authenticate('jwt', {session:false}), getParametrosDenuncia);

router.get('/getmunicipioprovdep', passport.authenticate('jwt', {session:false}), getMunicipioProvDep)

router.get('/obtienefamiliares/:cod_denuncia', passport.authenticate('jwt', {session:false}), obtieneFamiliares);

router.get('/obtienedendo/:cod_denuncia', passport.authenticate('jwt', {session:false}), obtienedendo);

router.get('/obtienedente/:cod_denuncia', passport.authenticate('jwt', {session:false}), obtienedente);

router.get('/obtienedenuncias/:id', passport.authenticate('jwt', {session:false}), obtieneDenuncias);

router.get('/obtieneden/:id', passport.authenticate('jwt', {session:false}), obtieneDen);

router.get('/obtienedatosprint/:cod_denuncia', passport.authenticate('jwt', {session:false}), obtienedatosPrint);

router.get('/obtieneprofdna/:cod_defensoria', passport.authenticate('jwt', {session:false}),obtieneProfesionalDNA)

router.get('/obtieneprofredes/:cod_muni', passport.authenticate('jwt', {session:false}),obtieneProfesionalredes)

router.get('/historialdenuncianna/:cod_nna', passport.authenticate('jwt', {session:false}),historialDenunciaNNA)

router.get('/historialdenunciado/:cod_per', passport.authenticate('jwt', {session:false}),historialDenunciaDenunciado)

router.get('/getorientacion/:cod_denuncia', passport.authenticate('jwt', {session:false}),getOrientacion)

router.get(
    '/obtieneDatosDashboard/:id',
    passport.authenticate('jwt', {session:false}),
    obtieneDatosDashboard
);

router.get(
    '/listarDenunciasEstado/:id_dna/:est',
    passport.authenticate('jwt', {session:false}),
    listarDenunciasEstado
);

router.post('/gestiondenuncias', passport.authenticate('jwt', {session:false}), gestionDenuncias);

router.post('/guardafamiliar', passport.authenticate('jwt', {session:false}), guardaFam);

router.post('/guardadenper', passport.authenticate('jwt', {session:false}), guardaDenPer);

router.post('/derivarcaso', passport.authenticate('jwt', {session:false}), derivarCaso);

router.post('/guardaorienfam', passport.authenticate('jwt', {session:false}), guardaOrientacionFamilia);

module.exports = router;
