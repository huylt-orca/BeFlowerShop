const express = require('express');
const bodyParser = require ("body-parser");
const route = require ("./route/Route");
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config(); // get value from .env

let app = express();
app.use(cors({origin: true}));

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',route);

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Customer API',
            description: "Customer API Informations",
            contact: {
                name: "Amz"
            },
            server: ["http://localhost:8000"]
        }
    },
    apis: ["./route/route.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



let port = process.env.PORT || 8080; // use process.env to get value from .env

app.listen(port,()=>{
    console.log(`Server start port http://localhost:${port}`)
})