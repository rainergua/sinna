const dotenv = require('dotenv');
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const path = require("path")

dotenv.config();
const port = process.env.PORT || 3000;
const uri = process.env.URI || 'http://localhost';
//Metadata info about our API

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SINNA BACKEND API", 
            version: "1.0.0"
        },
        servers: [
            {
                url: `${uri}:${port}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [ `${path.join(__dirname, "../routes/test.routes.js")}`, 
            `${path.join(__dirname, "../routes/mid_defensorias.routes.js")}`,
            `${path.join(__dirname, "../routes/mid_denuncias.routes.js")}`,
            `${path.join(__dirname, "../routes/modefa_centros_acogimiento.routes.js")}`,
            `${path.join(__dirname, "../routes/mospa.routes.js")}`,
            `${path.join(__dirname, "../routes/workflow.routes.js")}`,
            `${path.join(__dirname, "../routes/parametricas.routes.js")}`,
            `${path.join(__dirname, "../routes/auth.routes.js")}`,
            `${path.join(__dirname, "../routes/comun_personas.routes.js")}`,
            `${path.join(__dirname, "../routes/comun_familiar.routes.js")}`,

        ]
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
    console.log(`La documentación de la API puede ser consultada en ${uri}:${port}/api/docs`)
};

module.exports = { swaggerDocs }