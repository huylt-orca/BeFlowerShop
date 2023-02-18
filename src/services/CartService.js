const db = require("../models/index");

let addProductToCart = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
        let cart = await db.Cart.findOne({
            userId: userId,
            productId: data.productId,
        });
        if (!cart) {
            await db.Cart.create({
            userId: userId,
            productId: data.productId,
            quantity: data.quantity
            });
        } else {
            cart.quantity = data.quantity;
            await cart.save();
        }
        resolve("Add Product to Cart Successful");
        } catch (e) {
        reject(e);
        }
    });
};

let getAllProductByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
        let data = await db.Cart.findAll({
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
