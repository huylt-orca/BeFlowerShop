const db = require ('../models/index');


let create = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
        await db.Favorite.findOrCreate({
            userId: userId,
            productId: productId,
        });
        resolve("Create Favorite Successful");
        } catch (e) {
        reject(e);
        }
    });
};

let getAllFavoriteByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
        let data = await db.Favorite.findAll({
            where: {
            userId: userId,
            },
            include: [{ model: db.Product }],
        });
        resolve(data);
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
