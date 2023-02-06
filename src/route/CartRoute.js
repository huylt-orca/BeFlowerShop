const express = require('express');
const CartController = require('../controllers/CartController')

let route =  express.Router();

//route.get('/test',CartController.test);

route.get('/test',CartController.index);


module.exports = route;