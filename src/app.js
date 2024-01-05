const express = require('express');
const dotenv = require('dotenv');
//const verifyToken = require('./middlewares/verifyToken')

const testRoutes = require ('./app/routes/test.routes')
const mid_defensorias= require ("./app/routes/mid_defensorias.routes")
const modefa_centros_acogimiento= require ("./app/routes/modefa_centros_acogimiento.routes")
const mospaRoutes= require ("./app/routes/mospa.routes")
const workflowRoutes= require ("./app/routes/workflow.routes")


const cors = require("cors")

// Create a new Express app
const app = express();
dotenv.config(); 
const port = process.env.PORT || 3000;
const uri = process.env.URI || 'http://localhost';
// Configure middleware
// middleware to parse request bodies as JSON
app.use(express.json());

app.use(cors({
    origin: `*`, // Specify the allowed origin
    methods: 'GET,POST', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
  }));

// Define routes
app.use('/api',testRoutes);
app.use('/api/mid',mid_defensorias);
app.use('/api/modefa',modefa_centros_acogimiento);
app.use('/api/mospa',mospaRoutes);
app.use('/api/workflow',workflowRoutes);

module.exports = app;
