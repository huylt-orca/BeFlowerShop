const { Op } = require('sequelize');
const db = require ('../models/index');
const product = require('../models/product');

let getAllByUserId = (userId,data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let invoices = await db.Invoice.findAll({
                where:{
                    userId: userId
                },
                offset: (data.page - 1 ) * data.limit || 0, 
                limit: data.limit || 10
            });
            resolve(invoices);
        }catch (e){
            reject(e);
        }
    })
}

let create = (data,userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            data.products.forEach(async(product) =>  {
                let tmp = await db.Product.findOne({
                    where:{
                        [Op.and]:[
                            {
                                id: product.id 
                            },
                            {
                                quantity: {
                                    [Op.gt]:product.quantity
                                }
                            }
                        ]
                    }
                })

                if (!tmp){
                    reject("Product is out of stock");
                }
            });

            let invoice = await db.Invoice.create({
                userId: userId,
                createDate: new Date(),
                phone: data.phone,
                price: data.price,
                description:data.description
            });

            data.products.forEach(async product =>{
                await db.InvoiceProduct.create({
                    invoiceId: invoice.id,
                    productId: product.id,
                    quantity: product.quantity
                });
                await db.Product.update({
                    quantity: Sequelize.literal(`quantity - ${product.quantity}`) 
                },
                {
                    where:{
                        id: product.id
                    }
                } 
                )
            })

            resolve("Create Invoice Successful");
        }catch(e){
            reject(e);
        }
    })
}

let getIndex = (invoiceId) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let invoice = await db.Invoice.findByPk(invoiceId,{
                include: [
                    {
                      model: InvoiceProduct,
                      include: [
                        {
                          model: Product,
                        }
                      ]
                    }
                  ]
            });
            resolve(invoice);
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    getAllByUserId: getAllByUserId,
    create: create,
    getIndex: getIndex
}