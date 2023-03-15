const db = require ('../models/index');
const {hashUserPassword,generateToken, generateRefreshToken} = require('../utils/utils');
const Firebase = require('./Firebase');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

let createNewUser = async (data,image) =>{
    return new Promise (async(resolve, reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                fullname: data.fullname,
                gender: data.gender,
                birthday: data.birthday,
                username: data.username,
                password: hashPasswordFromBcrypt,
                image: image,
                address: data.address,
                phone: data.phone,
                role: 1
            })
            resolve('Create a new User')
        }catch (e){
            reject(e);
        }
    })
}


let login = (data) =>{
    return new Promise( async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{
                    username: data.username
                }
            });
            if (user){
                let check = await bcrypt.compareSync(data.password,user.password);
                if (check){
                    let token = generateToken(user.id);
                    let refreshToken = generateRefreshToken(user.id);
                    // resolve('Login successful: '+ token +"\n Refresh Token: " + refreshToken);
                    resolve(token);
                }
                reject('Login Failed');
            }
            reject('Login Failed'); 
        }catch (e){
            reject(e);
        }
    })
}


let getAll = (data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            if (!data.fullname){
                data.fullname=' ';
            }
            if (!data.limit){
                data.limit = 10;
            }else {
                data.limit = parseInt(data.limit);
            }
            let users = await db.User.findAll({
                where: {
                    fullname: {
                        [Op.like]: `%${data.fullname.trim()}%`
                    }
                },
                attributes: { exclude: ['password'] },
                offset: (data.page - 1 ) * data.limit || 0, 
                limit: parseInt(data.limit) 
            });
            resolve(users);
            
        }catch (e){
            reject(e);
        }
    })
}

let update = (data,userId)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            await db.User.update({
                fullname:data.fullname,
                gender: data.gender,
                birthday: data.birthday,
                password: data.password,
                image: data.image,
                address: data.address,
                phone: data.phone
            },{
                where:{
                    id: userId
                }
            });
            resolve("Update User Successful");
        }catch (e){
            reject(e);
        }
    })
}

let getIndex = (id)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            let user = await db.User.findByPk(id,{
                
            });
            resolve(user);
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    getAll: getAll,
    createNewUser:createNewUser,
    login: login,
    update:update,
    getIndex: getIndex
}