const bcrypt = require('bcryptjs');
const db = require ('../models/index');

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) =>{
    return new Promise (async(resolve, reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            console.log(data);
            console.log(hashPasswordFromBcrypt);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt
            })
            resolve('Create a new User')
        }catch (e){
            reject(e);
        }
    })
}

let hashUserPassword = (password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}

let getAllUser = () =>{
    return new Promise(async(resolve,reject) =>{
        try {
            let users = db.User.findAll({
                raw:true, // chỉ lấy data hiện tại
            });
            delete user.password; // xoa 1 phần data trả ra
            resolve(users);
        } catch (e){
            reject(e);
        }
    })
}

let edit = (data) =>{
    return new Promise (async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id: data.id}
            })

            if (user){ 
                user.fullname = data.fullname;

                await user.save();
                resolve(user)
            }
            resolve({})
        } catch (e){
            reject(e);
        }
    })
}

let deleteUser = (id) =>{
    return new Promise (async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                attributes:['email','password'],
                where:{id: data.id},
                // attributes:{
                //     inclue:['email','id'],// get
                //     exclude:[] // not get
                // }
            })

            if (user){ 

                await user.destroy();
                resolve(user)
            }
            resolve({})
        } catch (e){
            reject(e);
        }
    })
    
}

let getAll = (id)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            if (!id){
                resolve('missing');
            } else{
                let data = await db.User.findOne({
                    where:{
                        id: id
                    },
                    attributes:{
                        exclude: ['password']
                    },
                    include: [
                        {model: db.Cart, attributes:['description']},
                        {model: db.Cart,as:'tenmqh', attributes:['description']},// dung cho truong hop 2table noi nhieu qh vs nhau

                    ],
                    raw:true,
                    nest: true
                })
                resolve(data)
            }
        }catch (e){
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    editUser:edit
}