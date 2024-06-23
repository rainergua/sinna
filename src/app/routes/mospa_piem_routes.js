const express = require('express');

const passport =require('passport')
const {
    comboCasosSinPiem,
    gestionPiem, listaPiem, listaPiemJuzgado
} = require("../controllers/mospa_piem_controller");
const upload = require("../middlewares/imageUploadMiddleware");


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

module.exports = router;