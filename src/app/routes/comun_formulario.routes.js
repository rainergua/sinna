const express = require('express');
const passport = require('passport');
const router = express.Router();
const { formulario } = require ('../controllers/comun_formulario.controller')

router.get('/:id',
    passport.authenticate('jwt', {session:false}),
    formulario,
);


module.exports = router;