const express = require('express');
const dotenv = require('dotenv');
//const verifyToken = require('./middlewares/verifyToken')
const path = require('path');



const testRoutes = require ('./app/routes/test.routes')
const mid_defensorias= require ("./app/routes/mid_defensorias.routes")
const mid_denuncias = require("./app/routes/mid_denuncias.routes")
const mid_flujos = require("./app/routes/mid_flujos.routes")
const mid_reportes = require("./app/routes/mid_reportes.routes")
const modefa_centros_acogimiento= require ("./app/routes/modefa_centros_acogimiento.routes")
const modefa_ingreso_nna= require ("./app/routes/modefa_ingreso_nna.routes")
const mospaRoutes= require ("./app/routes/mospa.routes")
const workflowRoutes= require ("./app/routes/workflow.routes")
const parametricasRoutes= require ("./app/routes/parametricas.routes")
const comunRoutes = require("./app/routes/comun.routes")
const authRoutes= require ("./app/routes/auth.routes")
const personaRoutes = require("./app/routes/comun_personas.routes")
const familiaRoutes = require("./app/routes/comun_familiar.routes")
const movimientosRoutes=require("./app/routes/mospa_movimientos.routes")
const juzgadoRoutes = require("./app/routes/comun_juzgados.routes")
const formularioRoutes = require("./app/routes/comun_formulario.routes")
const documentosRoutes=require("./app/routes/documentos.routes")
const autorizacionesViajeRoutes=require("./app/routes/mid_autorizaciones_viaje.routes")
const autorizacionesTrabajoRoutes=require("./app/routes/mid_autorizaciones_trabajo.routes")
const piemRoutes=require("./app/routes/mospa_piem_routes")
const expedientesMospaRoutes=require("./app/routes/mospa_expedientes.routes")
const cors = require("cors")

// Create a new Express app
const app = express();

dotenv.config(); 
const port = process.env.PORT || 3000;
const uri = process.env.URI || 'http://localhost';


// Configure middleware
// middleware to parse request bodies as JSON

app.use('/public', express.static(path.join(__dirname, 'app', 'public')));
app.use(express.json());

app.use(cors({
  origin: `*`, // Specify the allowed origin
  methods: 'GET,POST', // Specify the allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
}));


require('./utils/auth');

// Define routes
app.use('/api',testRoutes);
app.use('/api/mid',mid_defensorias);
app.use('/api/mid',mid_denuncias);
app.use('/api/mid',mid_flujos);
app.use('/api/mid',mid_reportes);
app.use('/api/mid',autorizacionesViajeRoutes);
app.use('/api/mid',autorizacionesTrabajoRoutes)
app.use('/api/comun',comunRoutes);
app.use('/api/modefa',modefa_centros_acogimiento);
app.use('/api/modefa',modefa_ingreso_nna);
app.use('/api/mospa',mospaRoutes);
app.use('/api/mospa',movimientosRoutes);
app.use('/api/mospa',piemRoutes);
app.use('/api/workflow',workflowRoutes);
app.use('/api/parametricas',parametricasRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/persona',personaRoutes);
app.use('/api/familia',familiaRoutes);
app.use('/api/juzgados',juzgadoRoutes);
app.use('/api/formulario',formularioRoutes);
app.use('/api/documentos',documentosRoutes);
app.use('/api/mospa',expedientesMospaRoutes);


module.exports = app;
