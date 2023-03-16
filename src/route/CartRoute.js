const express = require('express');
const CartController = require('../controllers/CartController')

let route =  express.Router();



route.get('/',CartController.getAllProductByUserId);
route.get('/:productId',CartController.getProductInCart);
route.post('/',CartController.addProductToCart);
route.delete('/:productId',CartController.removeProductToCart);


module.exports = route;