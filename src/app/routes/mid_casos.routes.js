const express = require('express');

const passport =require('passport')
const {
    gestionCaso
} = require("../controllers/mid_casos.controller");
const upload = require("../middlewares/imageUploadMiddleware");

const router = express.Router();

/**
 * @swagger
 */


router.post('/gestionCaso',
    passport.authenticate('jwt',{session:false}),
    upload.single('url_foto_extravio'),
    gestionCaso
);



module.exports = router;