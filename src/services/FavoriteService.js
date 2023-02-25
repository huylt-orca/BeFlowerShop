const db = require ('../models/index');


let create = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
        await db.Favorite.findOrCreate({ 
            where:{
            userId: userId,
            productId: productId,
        }});
        resolve("Create Favorite Successful");
        } catch (e) {
        reject(e);
        }
    });
};

let getAllFavoriteByUserId = (userId,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.limit){
                data.limit = 10;
            }
        let favorite = await db.Favorite.findAll({
            where: {
                userId: userId,
            },
            include: [{ model: db.Product }],
            raw:true,
            nest:true,
            offset: (data.page - 1 ) * data.limit || 0, 
            limit: parseInt(data.limit) 
        });
        resolve(favorite);
        } catch (e) {
        reject(e);
        }
    });
};

let remove = (userId, productId) =>{
    return new Promise(async (resolve, reject) => {
        try {
           await db.Favorite.destroy({
            where: {
              userId: userId,
              productId:productId
            }
          });
          resolve("Remove Favorite Successful");
        } catch (e) {
          reject(e);
        }
      });
}

module.exports = {
    getAllFavoriteByUserId: getAllFavoriteByUserId,
    remove: remove,
    create: create
};
