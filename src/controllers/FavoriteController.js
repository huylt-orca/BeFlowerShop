const FavoriteService = require("../services/FavoriteService");

module.exports = {

  async create(req, res) {
    try {
      await FavoriteService.create(req.query.userId,req.body.productId);

      return res.status(200).json({
        status: 200,
        message: "Create Favorite Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    try {
      await FavoriteService.remove(req.query.userId,req.params.productId);

      return res.status(200).json({
        status: 200,
        message: "Remove Favorite Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async getAllFavoriteByUserId(req, res) {
    try {
      let data = await FavoriteService.getAllFavoriteByUserId(req.query.userId,req.query);

      return res.status(200).json({
        status: 200,
        message: "Get Favorite list by userID successful",
        data: data,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
