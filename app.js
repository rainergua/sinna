const express = require('express');

//const verifyToken = require('./middlewares/verifyToken')

const testRoutes = require ('./routes/test.routes')

const cors = require("cors")

// Create a new Express app
const app = express();

// Configure middleware
// middleware to parse request bodies as JSON
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000', // Specify the allowed origin
    methods: 'GET,POST', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
  }));

// Define routes
app.use('/api',testRoutes);

module.exports = app;
