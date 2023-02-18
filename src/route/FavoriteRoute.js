const express = require('express');
const FavoriteController = require('../controllers/FavoriteController')

let route =  express.Router();


route.post('/',FavoriteController.create);
route.delete('/:productId/:userId',FavoriteController.delete);
route.get('/:userId',FavoriteController.getAllFavoriteByUserId);

module.exports = route;