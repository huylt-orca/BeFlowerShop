const { Op } = require('sequelize');
const db = require ('../models/index');
const product = require('../models/product');

let getAllByUserId = (userId,pagination)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let invoices = await db.Invoice.findAll({
                where:{
                    userId: userId
                },
                offset: (pagination.page - 1 ) * pagination.limit || 0, 
                limit: pagination.limit || 10
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
                    reject("Hello");
                }
            });

            await db.Invoice.create({
                userId: userId,
                createDate: new Date(),
                phone: data.phone,
                price: data.price,
                description:data.description
            });
            resolve("Create Invoice Successful");
        }catch(e){
            reject(e);
        }
    })
}

let getIndex = (invoiceId) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let invoice = await db.Invoice.findByPk(invoiceId);
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