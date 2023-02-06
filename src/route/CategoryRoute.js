const express = require('express');
const CategoryController = require('../controllers/CategoryController')

let route =  express.Router();

//route.get('/test',CategoryController.test);
route.get('/test',CategoryController.index);


module.exports = route;