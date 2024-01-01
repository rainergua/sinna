const app = require('./app.js');
const dotenv = require('dotenv');
const {swaggerDocs: V1SwaggerDocs} = require("./app/docs/swagger")

dotenv.config();
const port = process.env.PORT || 3000;
const uri = process.env.URI || 'http://localhost';


 // load environment variables from .env file
// start the server
app.listen(port, () => {
    console.log(`Servidor listo en ${uri}:${port}`);
    V1SwaggerDocs(app, port);
  });