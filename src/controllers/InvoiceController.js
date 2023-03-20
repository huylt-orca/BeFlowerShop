const { getAllByUserId } = require("../services/InvoiceService");
const InvoiceService = require("../services/InvoiceService");

module.exports = {
  async index(req, res) {
    // #swagger.tags = ['Invoice']
    let data = await InvoiceService.getIndex(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Get Invoice Successful",
      data: data,
    });
  },

  async create(req, res) {
    // #swagger.tags = ['Invoice']
    try {
      const {phone, description,products} = req.body;
      const {id,quantity} = req.body.products;
      await InvoiceService.create(req.body, req.query.userId);
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
    // #swagger.tags = ['Invoice']
    try {
      const {limit,page} = req.query;
      let invoices = await InvoiceService.getAllByUserId(req.query.userId, req.query);
      return res.status(200).json({
        status: 200,
        message: "Get All Invoice By User Successful",
        data: invoices,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Get All Invoice By User Failed",
      });
    }
  },

  async getAllInvoiceByDate(req,res){
    // #swagger.tags = ['Invoice']
    try { 
      const {limit,page,startDate,endDate,ascending} = req.query;
      let invoices = await InvoiceService.getAllByDate(req.query);
      return res.status(200).json({
        status: 200,
        message: "Get All Invoice By Date Successful",
        data: invoices,
      });
    } catch (err){
      return res.status(400).json({
        status: 400,
        message: "Get All Invoice By Date Failed",
      });
    }
  }
};
