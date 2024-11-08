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
    servers: [{ url: 'mysql://ueuhvy1q22pnq6nb:hluATN3GfuUD3sADXQnE@bipyvggoxvlqujm8awc6-mysql.services.clever-cloud.com:3306/bipyvggoxvlqujm8awc6' }],
  },
  apis: [`${__dirname}/routes/*.js`], // Certifique-se de que suas rotas estejam no caminho correto
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});
