const express = require('express');
const InvoiceController = require('../controllers/InvoiceController')

let route =  express.Router();

route.post('/',InvoiceController.create);
route.get('/:id',InvoiceController.index);
route.get('/',InvoiceController.getAllByUserId);



module.exports = route;