const CategoryService = require("../services/CategoryService");
const data = require('../data/data');

module.exports = {
  async getAll(req, res) {
     // #swagger.tags = ['Category']
     const {page,limit,name} = req.query;
    let data = await CategoryService.getAll(req.query);
    return res.status(200).json({
      status: 200,
      message: "Get Category Successful",
      data: data,
    });
  },

  async create(req, res) {
    // #swagger.tags = ['Category']
    try {
      const {name,description} = req.body;
      await CategoryService.create(req.body);
      return res.status(200).json({
        status: 200,
        message: "Create Category Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Create Category Failed",
      });
    }
  },

  async update(req, res) {
    // #swagger.tags = ['Category']
    try {
      const {name,description} = req.body;
      CategoryService.update(req.body, req.params.id);
      return res.status(200).json({
        status: 200,
        message: "Update Category Successful"
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Update Category Failed",
      });
    }
  },

  
};
