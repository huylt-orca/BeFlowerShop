const { getAllByUserId } = require("../services/InvoiceService");
const InvoiceService = require("../services/InvoiceService");

module.exports = {
  async index(req, res) {
    let data = await InvoiceService.getIndex(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Get Invoice Successful",
      data: data,
    });
  },

  async create(req, res) {
    try {
      await InvoiceService.create(req.body, req.user);
      return res.status(200).json({
        status: 200,
        message: "Create Invoice Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async getAllByUserId(req, res) {
    try {
      let invoices = InvoiceService.getAllByUserId(req.params.id);
      return res.status(200).json({
        status: 200,
        message: "Get All Invoice By User Successful",
        data: invoices,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
