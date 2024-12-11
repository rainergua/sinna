const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarPlanAccion,
    gestionPlanAccion,
    aprobarPlanAccion
} = require ('../controllers/modipi_plan_accion.controller')
const upload = require("../middlewares/imageUploadMiddleware");

router.get(
    '/listarPlanAccion/:est',
    passport.authenticate('jwt',{session:false}),
    listarPlanAccion
);

router.post(
    '/gestionPlanAccion',
    passport.authenticate('jwt',{session:false}),
    gestionPlanAccion
);



router.post(
    '/aprobarPlanAccion',
    passport.authenticate('jwt',{session:false}),
    upload.fields([
        { name: 'url_acta_subconsejo_aprobacion', maxCount: 1 },
    ]),
    aprobarPlanAccion
);

module.exports = router;
