const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.set('port', 3006);

app.use(cors());
app.use(express.json());

// Configurações do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Define a versão do OpenAPI
    info: {
      title: 'API Nostaljoy',
      version: '1.0.0',
      description: 'Documentação da API Nostaljoy',
    },
    servers: [
      {
        url: "http://localhost:3006",
        description: "Servidor de Desenvolvimento"
      }
    ],
  },
  apis: ['./routes/*.js'], // Caminho para seus arquivos de rotas onde há documentação
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da aplicação
const userRouter = require("./routes/userRouter");
app.use('/api', userRouter);

module.exports = app;
