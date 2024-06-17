const express = require('express');
const passport = require('passport');
const router = express.Router();
const { 
    obtieneDerivacionesAsign,
    obtieneDerivacionesAcept,
    obtienesituacionlegal,
    obtieneHistoriaDeriva,
    obtieneParams,
    mensajeFlujo,
    mensajeSeguimiento,
    grabaExpediente,
    grabaDocumento,
    obtieneEstado,
    obtieneExpedienteCaso,
    obtieneDoc 
} = require ('../controllers/mid_flujos.controller')

//obtienederivacionesasign
router.get('/obtienederivacionesasign', passport.authenticate('jwt', {session:false}), obtieneDerivacionesAsign);

//obtienederivacionesasign
router.get('/obtienederivacionesacept', passport.authenticate('jwt', {session:false}), obtieneDerivacionesAcept);

//obtienesituacionlegal
router.get('/obtienesituacionlegal/:id_defensoria', passport.authenticate('jwt', {session:false}), obtienesituacionlegal)

router.get('/obtienehistoriaderiva/:id_denuncia', passport.authenticate('jwt', {session:false}), obtieneHistoriaDeriva)

router.get('/obtieneparams', passport.authenticate('jwt', {session:false}), obtieneParams);

router.get('/obtieneestado', passport.authenticate('jwt', {session:false}), obtieneEstado);

router.get('/obtieneexpedientecaso/:cod_caso', passport.authenticate('jwt', {session:false}), obtieneExpedienteCaso);
//obtieneDoc 
router.get('/obtienedoc/:id_expediente', passport.authenticate('jwt', {session:false}), obtieneDoc);
//
router.get('/mensajeflujo/:cargo', passport.authenticate('jwt', {session:false}), mensajeFlujo);

router.get('/mensajeseguimiento/:cargo', passport.authenticate('jwt', {session:false}), mensajeSeguimiento);

router.post('/grabaexpediente', passport.authenticate('jwt', {session:false}), grabaExpediente);

router.post('/grabadocumento', passport.authenticate('jwt', {session:false}), grabaDocumento);

module.exports = router;
