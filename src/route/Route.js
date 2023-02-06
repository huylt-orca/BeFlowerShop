const express = require('express');


const cartRoute = require('./CartRoute');
const categoryRoute = require('./CategoryRoute');
const favoriteRoute = require('./FavoriteRoute');
const imageRoute = require('./ImageRoute');
const invoiceProductRoute = require('./InvoiceProductRoute');
const invoiceRoute = require('./InvoiceRoute');
const productRoute = require('./ProductRoute');
const userRoute = require('./UserRoute');


let router = express();

router.use('/cart',cartRoute);
router.use('/category',categoryRoute);
router.use('/favorite',favoriteRoute);
router.use('/image',imageRoute);
router.use('/invoice-product',invoiceProductRoute);
router.use('/invoice',invoiceRoute);
router.use('/product',productRoute);
router.use('/user',userRoute);



module.exports=router