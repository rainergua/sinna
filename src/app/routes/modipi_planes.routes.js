const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarPlan,
    gestionPlan,
    listResultadosPlan,
    getComboPlanAccion
} = require ('../controllers/modipi_planes.controller')
const upload = require("../middlewares/fileUploadMiddleware");

router.get(
    '/listarPlan/:resp/:id',
    passport.authenticate('jwt',{session:false}),
    listarPlan
);

router.post(
    '/gestionPlan',
    passport.authenticate('jwt',{session:false}),
    gestionPlan
);

router.get(
    '/listResultadosPlan/:resp/:plan',
    passport.authenticate('jwt',{session:false}),
    listResultadosPlan
);

router.get(
    '/getComboPlanAccion',
    passport.authenticate('jwt',{session:false}),
    getComboPlanAccion
);

module.exports = router;
