const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
require('dotenv').config();
const process = require('process');
const secretKey = process.env.SECRETKEY;
const refreshKey = process.env.REFRESHKEY;
const salt = bcrypt.genSaltSync(10);

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

let generateToken = (data) => {
   
    return jwt.sign({data:data}, secretKey, {
        expiresIn: 60,
    });
}

let getDataFromToken = (token) =>{
    try {
        let result = jwt.verify(token,secretKey);
        return result;
    }catch(e){
        console.log(e);
        return null;
    }
}

let generateRefreshToken = (data) => {
   
    return jwt.sign({data:data}, secretKey);
}

let getDataFromRefreshToken = (token) =>{
    try {
        let result = jwt.verify(token,secretKey);
        return result;
    }catch(e){
        console.log(e);
        return null;
    }
}

let getTokenFromHeader = (req) =>{
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length);
         return token;
    }
     return null;
    
}


module.exports= {
    hashUserPassword:hashUserPassword,
    generateToken: generateToken,
    getDataFromToken: getDataFromToken,
    generateRefreshToken: generateRefreshToken,
    getDataFromRefreshToken: getDataFromRefreshToken,
    getTokenFromHeader: getTokenFromHeader
}