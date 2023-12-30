const dotenv = require('dotenv');
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const path = require("path")

dotenv.config();
const port = process.env.PORT || 3000;
//Metadata info about our API

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SINNA - Modulo de Informacion de Defensorias MID API", 
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://172.16.100.201:${port}`
            }
        ]
    },
    apis: [`${path.join(__dirname, "../routes/test.routes.js")}`]
};
//Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);
//Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Version 1 Docs are avalable at localhost:${port}/api/docs`)
};

module.exports = { swaggerDocs }