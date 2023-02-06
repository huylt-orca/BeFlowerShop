const ProductService = require("../services/ProductService");

module.exports = {
  async index(req, res) {
    return res.status(200).json({
      status: 200,
      message: "Message",
      data: "data",
    });
  },

  async store(req, res) {
    try {
      return res.status(200).json({
        status: 200,
        message: "Message",
        data: "data",
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
      return res.status(200).json({
        status: 200,
        message: "Message",
        data: "data",
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
      return res.status(200).json({
        status: 200,
        message: "Message",
        data: "data",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
