const db = require ('../models/index');
const {hashUserPassword,generateToken, generateRefreshToken} = require('../utils/utils');
const bcrypt = require('bcryptjs');

let createNewUser = async (data) =>{
    return new Promise (async(resolve, reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                fullname: data.fullname,
                gender: data.gender,
                birthday: data.birthday,
                username: data.username,
                password: hashPasswordFromBcrypt,
                image: data.image,
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



//35
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
                    resolve('Login successful: '+ token +"\n Refresh Token: " + refreshToken);
                }
                resolve('Login Failed');
            }
            resolve('Login Failed'); 
        }catch (e){
            reject(e);
        }
    })
}


let getAll = ()=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let data = await db.User.findAll();
            resolve(data);
            
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
            let user = await db.User.findByPk(id);
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