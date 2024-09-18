const express = require('express');
const passport =require('passport')
const { obtenerDatosBase, gestionExpediente, comboExpediente, listaExpediente
} = require("../controllers/mospa_expedientes.controller");

const router = express.Router();
/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
/**
 * @swagger
 * /api/mospa/comboExpediente:{id}:
 *  get:
 *      summary: Lista de Adolescentes Ingresados en un Centro, Activos, que tienen un Expediente abierto
 *      tags: [Listar, MOSPA Expedientes]
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *      parameters:
 *           - name: id
 *             in: path
 *             description: ID del Centro
 *             required: true
 *             schema:
 *                  type: integer
 *                  style: simple
 *
 */
router.get('/comboExpediente/:id',
    passport.authenticate('jwt',{session:false}),
    comboExpediente
);

router.get('/obtenerDatosBase/:id',
    passport.authenticate('jwt',{session:false}),
    obtenerDatosBase
);

router.post('/gestionExpediente',
    passport.authenticate('jwt',{session:false}),
    gestionExpediente
);

router.get('/listaExpediente/:id/:tipo',
    passport.authenticate('jwt',{session:false}),
    listaExpediente
);

module.exports = router;