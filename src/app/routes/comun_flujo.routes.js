const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarFlujos, gestionFlujos
} = require ('../controllers/comun_flujo.controller')
const {getMe} = require("../controllers/auth.controller");
const upload = require("../middlewares/imageUploadMiddleware");


router.get(
    '/listarFlujos/:m/:e',
    passport.authenticate('jwt',{session:false}),
    listarFlujos
);


router.post(
    '/gestionFlujos',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_imagen_flujo'),
    gestionFlujos
);



module.exports = router;
