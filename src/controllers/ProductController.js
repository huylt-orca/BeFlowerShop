const ProductService = require("../services/ProductService");
const Firebase = require('../services/Firebase');

module.exports = {
  async index(req, res) {
    // #swagger.tags = ['Products']
    let product = await ProductService.getProductById(req.params.id);

    return res.status(200).json({
      status: 200,
      message: "Get Product Successful",
      data: product,
    });
  },

  async getAll(req, res) {
    // #swagger.tags = ['Products']
    const {limit,page,name,categoryId} = req.query;
    let products = await ProductService.getAll(req.query);

    return res.status(200).json({
      status: 200,
      message: "Get Products Successful",
      data: products,
    });
  },

  async create(req, res) {
      // #swagger.tags = ['Products']
/*
          #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
              description: 'Some description...',
        } */
    try {
      const{name,description,quantity,price,categoryId} = req.body;
      const listImage = [];
      req.files.forEach(async file =>  {
        const url = await Firebase.uploadImage(file);
        listImage.push(url);
      });

      await ProductService.create(req.body,listImage);
      return res.status(200).json({
        status: 200,
        message: "Create Product Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Create Product Failed",
      });
    }
  },
  
  async update(req, res) {
    // #swagger.tags = ['Products']
    try {
      const{id,name,description,status,price,categoryId} = req.body;
      await ProductService.update(req.body);
      return res.status(200).json({
        status: 200,
        message: "Update Product Successful",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Update Product Failed",
      });
    }
  },

  async delete(req, res) {
    // #swagger.tags = ['Products']
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
        message: "Delete Product Failed",
      });
    }
  },

  

  async testUpload(req,res) {
    // #swagger.ignore = true
      // return res.json(req.file.firebaseUrl);
      const file = await Firebase.uploadImage(req.file);
      return res.json(file);
  }
};
