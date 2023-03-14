const express = require('express');
const bodyParser = require ("body-parser");
const route = require ("./route/Route");
const cors = require('cors');

// const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

require('dotenv').config(); // get value from .env

let app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];

const corsOptions = {
    origin: function(origin, callback) {
      // Kiểm tra xem origin có nằm trong danh sách các domain cho phép không
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    optionsSuccessStatus: 200
  }
  
  app.use(cors(corsOptions));

// app.use(cors({origin: true}));

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',route);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerFile));




let port = process.env.PORT || 8080; // use process.env to get value from .env

app.listen(port,()=>{
    console.log(`Server start port http://localhost:${port}`)
})