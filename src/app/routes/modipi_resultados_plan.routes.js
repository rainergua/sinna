const express = require('express');

const passport =require('passport')
const router = express.Router();
const {

    listarResultadosPlan,
    gestionResultadoPlan,

} = require ('../controllers/modipi_resultados_plan.controller')
const upload = require("../middlewares/fileUploadMiddleware");

router.get(
    '/listarResultadosPlan/:id',
    passport.authenticate('jwt',{session:false}),
    listarResultadosPlan
);

router.post(
    '/gestionResultadoPlan',
    passport.authenticate('jwt',{session:false}),
    gestionResultadoPlan
);


module.exports = router;
