const ProductService = require("../services/ProductService");


module.exports = {
  async index(req, res) {
    let product = await ProductService.getProductById(req.params.id);

    return res.status(200).json({
      status: 200,
      message: "Get Product Successful",
      data: product,
    });
  },

  async getAll(req, res) {
    let products = await ProductService.getAll(req.query);

    return res.status(200).json({
      status: 200,
      message: "Get Products Successful",
      data: products,
    });
  },

  async create(req, res) {
    try {
      
      await ProductService.create(req.body);

      return res.status(200).json({
        status: 200,
        message: "Create Product Successful",
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
      let data = {
        id: req.params.id,
        status:0
      };
      await ProductService.update(data);
      return res.status(200).json({
        status: 200,
        message: "Delete Product Successful",
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
      await ProductService.update(req.body);
      return res.status(200).json({
        status: 200,
        message: "Update Product Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },


};
