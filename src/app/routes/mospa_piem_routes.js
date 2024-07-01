const express = require('express');

const passport =require('passport')
const {
    comboCasosSinPiem,
    gestionPiem, listaPiem, listaPiemJuzgado, gestionSegPiem, listarSegPiem, comboExpediente, obtenerDatosBase
} = require("../controllers/mospa_piem_controller");



const router = express.Router();

router.get('/comboCasosSinPiem/:id',
    passport.authenticate('jwt',{session:false}),
    comboCasosSinPiem
);

router.post('/gestionPiem',
    passport.authenticate('jwt',{session:false}),
    gestionPiem
);

router.get('/listaPiem/:id',
    passport.authenticate('jwt',{session:false}),
    listaPiem
);


router.get('/listaPiemJuzgado',
    passport.authenticate('jwt',{session:false}),
    listaPiemJuzgado
);

router.post('/gestionSegPiem',
    passport.authenticate('jwt',{session:false}),
    gestionSegPiem
);

router.get('/listarSegPiem/:id',
    passport.authenticate('jwt',{session:false}),
    listarSegPiem
);





module.exports = router;