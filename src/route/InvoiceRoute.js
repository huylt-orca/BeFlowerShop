const express = require('express');
const InvoiceController = require('../controllers/InvoiceController')

let route =  express.Router();

route.post('/',InvoiceController.create);
route.get('/:id',InvoiceController.index);
route.get('/user/:id',InvoiceController.getAllByUserId);



module.exports = route;