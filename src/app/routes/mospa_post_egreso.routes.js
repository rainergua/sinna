const express = require('express');

const passport =require('passport')
const {
    comboCasosSinPostEgreso,
    gestionPostEgreso,
    listaPostEgreso, listaSeguimientosPostEgreso, gestionSeguimientoPostEgreso
} = require("../controllers/mospa_post_egreso.controller");



const router = express.Router();

router.get('/comboCasosSinPostEgreso/:id',
    passport.authenticate('jwt',{session:false}),
    comboCasosSinPostEgreso
);

router.post('/gestionPostEgreso',
    passport.authenticate('jwt',{session:false}),
    gestionPostEgreso
);

router.get('/listaPostEgreso/:id',
    passport.authenticate('jwt',{session:false}),
    listaPostEgreso
);

router.get('/listaSeguimientosPostEgreso/:id',
    passport.authenticate('jwt',{session:false}),
    listaSeguimientosPostEgreso
);

router.post('/gestionSeguimientoPostEgreso',
    passport.authenticate('jwt',{session:false}),
    gestionSeguimientoPostEgreso
);



module.exports = router;