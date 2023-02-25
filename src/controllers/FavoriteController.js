const FavoriteService = require("../services/FavoriteService");

module.exports = {

  async create(req, res) {
    // #swagger.tags = ['Favorite']
    try {

      await FavoriteService.create(req.query.userId,req.body.productId);

      return res.status(200).json({
        status: 200,
        message: "Create Favorite Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Create Favorite Failed",
      });
    }
  },

  async delete(req, res) {
    // #swagger.tags = ['Favorite']
    try {
      await FavoriteService.remove(req.query.userId,req.params.productId);

      return res.status(200).json({
        status: 200,
        message: "Remove Favorite Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Remove Favorite Failed",
      });
    }
  },

  async getAllFavoriteByUserId(req, res) {
    // #swagger.tags = ['Favorite']
    try {
      const {page,limit} = req.query;
      let favorites = await FavoriteService.getAllFavoriteByUserId(req.query.userId,req.query);

      return res.status(200).json({
        status: 200,
        message: "Get Favorite list by userID Successful",
        data: favorites,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Get Favorite list by userID Failed",
      });
    }
  },
};
