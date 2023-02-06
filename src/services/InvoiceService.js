const db = require ('../models/index');

let getAll = ()=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let data = await db.Invoice.findAll();
            resolve(data);
        }catch (e){
            reject(e);
        }
    })
}

module.exports = {
    getAll: getAll,
}