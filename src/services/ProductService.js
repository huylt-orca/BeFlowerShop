const { Op } = require('sequelize');
const db = require ('../models/index');

let getAll = (data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            if (!data.name){
                data.name =' ';
            }
            if (!data.category){
                data.category='%';
            }
            if (!data.limit){
                data.limit = 10;
            }

            let products = await db.Product.findAll({
                where: {
                    [Op.and]:[
                        {
                            name:{
                                [Op.like]: `%${data.name.trim()}%`
                            },
                        },
                        {
                            categoryId:{
                                [Op.like]: `${data.category}`
                            }
                        }
                    ]
                },
                offset: (data.page - 1 ) * data.limit || 0, 
                limit: data.limit 
            });
            resolve(products);
        }catch (e){
            reject(e);
        }
    })
}

let create = (data,listImage)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            const product = await db.Product.create({
                name: data.name,
                quantity:data.quantity,
                price: data.price,
                description: data.description,
                status: 1,
                categoryId:data.categoryId 
            });

            
            listImage.forEach(async element => {
                await db.Image.create({
                    url: element,
                    productId: product.id
                })
            });
            resolve("Create Product Successful");
        }catch (e){
            reject(e);
        }
    })
}

let update = (data) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            if (data.quantity < 0){
                data.quantity = 0;
            }
            if (data.price < 0){
                data.price = 0;
            }

            await db.Product.update({
                name: data.name,
                quantity: data.quantity,
                price: data.price,
                description: data.description,
                status: data.status,
                categoryId:data.categoryId 
            },{
                where:{
                    id: data.id
                }
            });
            resolve("Update Product Successful");
        }catch(e){
            reject(e);
        }
    })
}

let getProductById = (id) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            let product = await db.Product.findOne({
                where:{
                    id:id
                }
            });
            resolve(product);
        }catch (e){
            reject(e);
        }
    })
}


module.exports = {
    getAll: getAll,
    create: create,
    update: update,
    getProductById: getProductById
}