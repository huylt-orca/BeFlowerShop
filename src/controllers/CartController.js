const CartService = require("../services/CartService");

module.exports = {
    async getAllProductByUserId(req, res) {
            let data = await CartService.getAllProductByUserId(req.params.userId);

            return res.status(200).json({
                status: 200,
                message: 'Get Cart Successful',
                data: data
            });
        
    },

    async addProductToCart(req, res) {
      try {
        await CartService.addProductToCart(req.params.userId,req.body);

        return res.status(200).json({
            status: 200,
            message: 'Add Product To Cart Successful',
        });

        } catch (err) {
            return res.status(400).json({
                status: 400,
                message: err,
            });
      }
    },

    async removeProductToCart(req, res) {
        try {
            await CartService.removeProductToCart(req.params.userId,req.params.productId);
            return res.status(200).json({
                status: 200,
                message: 'Remove Product To Cart Successful',
            });
    
            } catch (err) {
                return res.status(400).json({
                    status: 400,
                    message: err,
                });
          }
    },
};