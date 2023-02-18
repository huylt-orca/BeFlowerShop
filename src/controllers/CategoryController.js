const CategoryService = require("../services/CategoryService");
const data = require('../data/data');

module.exports = {
  async getAll(req, res) {
    let data = await CategoryService.getAll(req.query);
    return res.status(200).json({
      status: 200,
      message: "Get Category Successful",
      data: data,
    });
  },

  async create(req, res) {
    try {
      await CategoryService.create(req.body);
      return res.status(200).json({
        status: 200,
        message: "Create Category Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    try {
      let check = CategoryService.update(req.body);
      if (!check){
        return res.status(400).json({
          status: 400,
          message: 'Update Category Failed',
        });
      };
      return res.status(200).json({
        status: 200,
        message: "Create Category Successful"
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  
};
