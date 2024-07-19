const express = require('express');

const passport =require('passport')
const {
    comboCasosSinMjr, gestionMjr, listaMjr
} = require("../controllers/mospa_mjr.controller");



const router = express.Router();

router.get('/comboCasosSinMjr/:id',
    passport.authenticate('jwt',{session:false}),
    comboCasosSinMjr
);

router.post('/gestionMjr',
    passport.authenticate('jwt',{session:false}),
    gestionMjr
);

router.get('/listaMjr/:id',
    passport.authenticate('jwt',{session:false}),
    listaMjr
);





module.exports = router;