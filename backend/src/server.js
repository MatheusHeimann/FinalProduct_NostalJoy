const app = require('./app');

const PORT = app.get('port');
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title:"API de tarefas",
            version: "1.0.0",
            description: "API CRUD para gereniar tarefas",
        },
        servers: [{url: "http://localhost:3006"}],
    },
    apis: [`${__dirname}/routes/*.js`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.listen(PORT, () => console.log(`Running at port ${PORT}`));