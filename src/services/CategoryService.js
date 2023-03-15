const { Op } = require('sequelize');
const db = require ('../models/index');

let getAll = (data)=>{
    return new Promise( async(resolve,reject)=>{
        try { 
            if (!data.name){
                data.name=' ';
            }
            if (!data.limit){
                data.limit = 10;
            }else {
                data.limit = parseInt(data.limit);
            }
            let categories = await db.Category.findAll({
                where: {
                    name:{
                        [Op.like]: `%${data.name.trim()}%`
                    }
                },
                offset: (data.page - 1 ) * data.limit || 0, 
                limit: data.limit
            });
            resolve(categories);
        }catch (e){
            reject(e);
        }
    })
};

let create = (data)=>{
    return new Promise (async(resolve, reject)=>{
        try {
            await db.Category.create({
                name: data.name,
                description: data.description
            });
            resolve('Create a new Category');
        }catch (e){
            reject(e);
        }
    })
};

let update = (data,id) =>{
    return new Promise (async(resolve, reject)=>{
        try {
            await db.Category.update({
                name: data.name,
                description: data.description
            }, {
                where: {
                    id: id
                }
            });
            resolve("Update Category Successful");
        }catch (e){
            reject(e);
        }
    })
};



module.exports = {
    getAll: getAll,
    create: create,
    update: update,
};