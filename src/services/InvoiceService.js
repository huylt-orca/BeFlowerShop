const { Op, Sequelize } = require('sequelize');
const db = require ('../models/index');

let getAllByUserId = (userId,data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            if (!data.limit){
                data.limit = 10;
            }else {
                data.limit = parseInt(data.limit);
            };
            let invoices = await db.Invoice.findAll({
                where:{
                    userId: parseInt(userId)
                },
                offset: (data.page - 1 ) * data.limit || 0, 
                limit: data.limit
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
            let newData = await checkProducts(data.products);
            
            let invoice = await db.Invoice.create({
                userId: userId,
                createDate: new Date(),
                phone: data.phone,
                price: newData.total,
                description:data.description
            });

            data.products.forEach(async (product,index) =>{
                await db.InvoiceProduct.create({
                    invoiceId: invoice.id,
                    productId: product.id,
                    quantity: product.quantity,
                    price: newData.listProduct[index].price
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

            await db.Invoice.update({
                price: newData.total
            }, {
                where:{
                    id: invoice.id
                }
            }
            )

            resolve("Create Invoice Successful");
        }catch(e){
            reject(e);
        }
    })
}

let checkProducts = (data) =>{
    return new Promise(async(resolve, reject) =>{
        let newData={};
        newData.total = 0;
        newData.listProduct =[];
        console.log("New");
        data.forEach(async(product) =>  {
            let tmp = await db.Product.findOne({
                where:{
                    [Op.and]:[
                        {
                            id: product.id 
                        },
                        {
                            quantity: {
                                [Op.gte]:product.quantity
                            }
                        },
                        {
                            status: 1
                        }
                    ]
                }
            })
        
            if (!tmp){
                reject("Product is out of stock");
            }
            newData.total += product.quantity * tmp.price;
            console.log(newData.total);
            newData.listProduct.push(tmp);
        });
        
        resolve(newData);
    });
}

let getIndex = (invoiceId) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let invoice = await db.Invoice.findByPk(invoiceId);
            let products = await db.InvoiceProduct.findAll({
                where:{
                    invoiceId: invoiceId
                },
                include:[
                    {
                        model: db.Product
                    }
                ],
                raw:true,
                nest:true,
            })
            invoice.products = products;
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