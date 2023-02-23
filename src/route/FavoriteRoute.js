const express = require('express');
const FavoriteController = require('../controllers/FavoriteController')

let route =  express.Router();


route.post('/',FavoriteController.create);
route.delete('/:productId',FavoriteController.delete);
route.get('/',FavoriteController.getAllFavoriteByUserId);

module.exports = route;