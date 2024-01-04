const express = require('express');
const dotenv = require('dotenv');
//const verifyToken = require('./middlewares/verifyToken')

const testRoutes = require ('./app/routes/test.routes')
const mid_defensorias= require ("./app/routes/mid_defensorias.routes")
const mospaRoutes= require ("./app/routes/mospa.routes")
const workflowRoutes= require ("./app/routes/workflow.routes")


const cors = require("cors")

// Create a new Express app
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.URI || 'http://localhost';
// Configure middleware
// middleware to parse request bodies as JSON
app.use(express.json());
dotenv.config(); 

app.use(cors({
    origin: `${uri}:${port}`, // Specify the allowed origin
    methods: 'GET,POST', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
  }));

// Define routes
app.use('/api',testRoutes);
app.use('/api/mid',mid_defensorias);
app.use('/api/mospa',mospaRoutes);
app.use('/api/workflow',workflowRoutes);

module.exports = app;
