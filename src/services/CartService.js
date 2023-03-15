const db = require("../models/index");

let addProductToCart = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
        let cart = await db.Cart.findOne(
            { where : {
                userId: userId,
                productId: data.productId,
            }}
           );
        if (!cart) {
            await db.Cart.create({
            userId: userId,
            productId: data.productId,
            quantity: data.quantity
            });
        } else { 
            await db.Cart.update({
                quantity: data.quantity
            },{
                where:{
                    userId: userId,
                    productId: data.productId, 
                }
            })
        }
        resolve("Add Product to Cart Successful");
        } catch (e) {
        reject(e);
        }
    });
};

let getAllProductByUserId = (userId,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.limit){
                data.limit = 10;
            }

        let tmp = await db.Product.findAll({
            include:[{
                model: db.Cart,
                where:{userId: userId}
            }],
            raw:true,
            nest:true,
            offset: (data.page - 1 ) * data.limit || 0, 
            limit: parseInt(data.limit)
        })

        for (let i = 0; i< tmp.length; i++){
            let tmpImage = await db.Image.findOne({where:{ productId: tmp[i].id}});
            tmp[i].image = tmpImage == null ? "" : tmpImage.url ;
            delete tmp.Carts;
        }
        resolve(tmp);
        } catch (e) {
        reject(e);
        }
    });
};

let removeProductToCart = (userId, productId) =>{
    return new Promise(async (resolve, reject) => {
        try {
           await db.Cart.destroy({
            where: {
              userId: userId,
              productId:productId
            }
          });
          resolve("Remove Product To Cart Successful");
        } catch (e) {
          reject(e);
        }
      });
}

module.exports = {
    getAllProductByUserId: getAllProductByUserId,
    addProductToCart: addProductToCart,
    removeProductToCart:removeProductToCart
};
