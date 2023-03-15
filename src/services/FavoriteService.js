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
            } else {
                data.limit = parseInt(data.limit);
            }

        let favorite = await db.Product.findAll({
            include: [{ model: db.Favorite, 
                where: {
                    userId: userId,
                }, 
            }],
            raw:true,
            nest:true,
            offset: (data.page - 1 ) * data.limit || 0, 
            limit: data.limit
        });
        
        for(let i =0; i < favorite.length; i++){
            let tmpImage = await db.Image.findOne({where:{productId: favorite[i].id}});
            favorite[i].image = tmpImage == null ? "" : tmpImage.url;
            delete(favorite[i].Favorites);
        }

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
