const express = require('express');
const ProductController = require('../controllers/ProductController')
const multer = require('multer');
const firebase = require('../services/Firebase');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024*1024
})

const upload = multer({ dest: 'uploads/' });

let route =  express.Router();

route.post('/testUpload',Multer.single("image"),ProductController.testUpload)

route.post('/',Multer.array('images'),ProductController.create);
route.put('/:id',ProductController.update);
route.delete('/:id',ProductController.delete);
route.get('/:id',ProductController.index);
route.get('/',ProductController.getAll);

module.exports = route;