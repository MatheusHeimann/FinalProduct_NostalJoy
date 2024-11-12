// server.js

const app = require('./app');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const PORT = app.get('port') || 3006;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de tarefas',
      version: '1.0.0',
      description: 'API CRUD para gerenciar tarefas',
    },
    servers: [{ url: 'http://localhost:3006' }],
  },
  apis: [`${__dirname}/routes/*.js`], // Certifique-se de que suas rotas estejam no caminho correto
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});
