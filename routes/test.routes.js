const express = require('express');
const verificaToken = require('../middlewares/verificaToken')
const router = express.Router();
const { 
    test,
    testdb, 
    testdbres,
    getToken,
} = require ('../controllers/test.controller')
//const configController = require('../controllers/config.controllers');

router.get('/test', test);


router.get('/testdb', testdb);
router.get('/testdbres', verificaToken, testdbres);

router.get('/gettoken', getToken);

//router.post('/gettoken', getToken);


//router.put('/gettoken', getToken);
module.exports = router;
