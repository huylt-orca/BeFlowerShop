const express = require('express');


const cartRoute = require('./CartRoute');
const categoryRoute = require('./CategoryRoute');
const favoriteRoute = require('./FavoriteRoute');
const imageRoute = require('./ImageRoute');
const invoiceProductRoute = require('./InvoiceProductRoute');
const invoiceRoute = require('./InvoiceRoute');
const productRoute = require('./ProductRoute');
const userRoute = require('./UserRoute');

const notificationController = require('../controllers/NotificationController');


let router = express();

router.use('/cart',cartRoute);
router.use('/categories',categoryRoute);
router.use('/favorite',favoriteRoute);
router.use('/image',imageRoute);
router.use('/invoice-product',invoiceProductRoute);
router.use('/invoices',invoiceRoute);
router.use('/products',productRoute);
router.use('/users',userRoute);
router.post('/notification',notificationController.create);



module.exports=router