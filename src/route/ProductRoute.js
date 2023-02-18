const express = require('express');
const ProductController = require('../controllers/ProductController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

let route =  express.Router();


route.post('/',upload.array('image'),ProductController.create);
route.put('/',ProductController.update);
route.delete('/:id',ProductController.delete);
route.get('/:id',ProductController.index);
route.get('/',ProductController.getAll);

module.exports = route;