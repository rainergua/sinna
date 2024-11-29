const express = require('express');

const passport =require('passport')
const router = express.Router();
const {
    listarLineamientos,
    gestionLineamientos
} = require ('../controllers/modipi_lineamientos_controller')

router.get(
    '/listarLineamientos/:est',
    passport.authenticate('jwt',{session:false}),
    listarLineamientos
);

router.post(
    '/gestionLineamientos',
    passport.authenticate('jwt',{session:false}),
    gestionLineamientos
);



module.exports = router;
