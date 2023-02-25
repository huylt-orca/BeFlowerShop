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
        let cart = await db.Cart.findAll({
            where: {
            userId: userId,
            },
            include: [{ model: db.Product }],
            raw:true,
            nest:true,
            offset: (data.page - 1 ) * data.limit || 0, 
            limit: parseInt(data.limit) 
        });
        resolve(cart);
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
