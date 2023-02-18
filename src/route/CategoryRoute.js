const express = require('express');
const CategoryController = require('../controllers/CategoryController')

let route =  express.Router();



route.post('/',CategoryController.create);
route.put('/',CategoryController.update);
route.get('/',CategoryController.getAll);

module.exports = route;