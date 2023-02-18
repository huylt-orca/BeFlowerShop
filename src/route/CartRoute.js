const express = require('express');
const CartController = require('../controllers/CartController')

let route =  express.Router();



route.get('/:userId',CartController.getAllProductByUserId);
route.post('/:userId',CartController.addProductToCart);
route.delete('/:productId/:userId',CartController.removeProductToCart);


module.exports = route;