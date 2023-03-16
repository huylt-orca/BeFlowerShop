const { getProductInCart } = require("../services/CartService");
const CartService = require("../services/CartService");

module.exports = {
    async getAllProductByUserId(req, res) {
        // #swagger.tags = ['Cart']
        const{page,limit} = req.query;
            let data = await CartService.getAllProductByUserId(req.query.userId,req.query);

            return res.status(200).json({
                status: 200,
                message: 'Get Cart Successful',
                data: data
            });
        
    },

    async addProductToCart(req, res) {
         // #swagger.tags = ['Cart']
      try {
        const {productId,quantity} = req.body;
        await CartService.addProductToCart(req.query.userId,req.body);

        return res.status(200).json({
            status: 200,
            message: 'Add Product To Cart Successful',
        });

        } catch (err) {
            return res.status(400).json({
                status: 400,
                message: 'Add Product To Cart Failed',
            });
      }
    },

    async removeProductToCart(req, res) {
         // #swagger.tags = ['Cart']
        try {
            await CartService.removeProductToCart(req.query.userId,req.params.productId);
            return res.status(200).json({
                status: 200,
                message: 'Remove Product To Cart Successful',
            });
    
            } catch (err) {
                return res.status(400).json({
                    status: 400,
                    message: 'Remove Product To Cart Failed',
                });
          }
    },

    async getProductInCart(req, res) {
        // #swagger.tags = ['Cart']
       try {
           let data = await CartService.getProductInCart(req.query.userId,req.params.productId);
           return res.status(200).json({
               status: 200,
               message: 'Get Product In Cart Successful',
               data:data
           });
   
           } catch (err) {
               return res.status(400).json({
                   status: 400,
                   message: 'Get Product In Cart Failed',
               });
         }
   },


};