const db = require ('../models/index');

let getAll = (id)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let data = await db.Category.findAll();
            resolve(data);
        }catch (e){
            reject(e);
        }
    })
}

module.exports = {
    getAll: getAll,
}