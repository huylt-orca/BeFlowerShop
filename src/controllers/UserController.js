const UserService = require("../services/UserService");
const {getDataFromToken, getDataFromRefreshToken, generateToken} = require("../utils/utils");
const Firebase = require('../services/Firebase');

module.exports = {
  async login(req, res) { 
    // #swagger.tags = ['Users']
    try {
      const {username, password} = req.body;
      let data = await UserService.login(req.body);
      return res.status(200).json({
        status: 200,
        message: "Login Successful",
        data: data,
      });
    } catch (err){
      return res.status(400).json({
        status: 200,
        message: "Login Failed",
      });
    }
    
  },

  async signup(req, res) {
    // #swagger.tags = ['Users']
    /*
          #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
        } */
    try {
      const{fullname, gender,birthday,username,password, address,phone} = req.body;
      let image="https://firebasestorage.googleapis.com/v0/b/prmflowershop.appspot.com/o/person.png?alt=media";
      if (req.file){ 
        image = await Firebase.uploadImage(req.file); 
      }
      let data = await UserService.createNewUser(req.body,image);
      return res.status(200).json({
        status: 200,
        message: "Signup Successful",
        data: data,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Signup Failed",
      });
    }
  },

  async getAll(req, res) {
    // #swagger.tags = ['Users']
    try {
      const {page,limit,fullname,id} = req.query;
      let data = await UserService.getAll(req.query);
      return res.status(200).json({
        status: 200,
        message: "Get All User Successful",
        data: data,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Get All User Failed",
      });
    }
  },

  async update(req, res) {
    // #swagger.tags = ['Users']
    try {
      if (req.file){
        req.body.image = await Firebase.uploadImage(req.file);
      }
      let data = await UserService.update(req.body,req.params.id);
      return res.status(200).json({
        status: 200,
        message: "Update User Successful",
        data: data,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Update User Failed",
      });
    }
  },
  async getUserByToken(req,res){
    // #swagger.tags = ['Users']
    try {
      return res.status(200).json({
        status: 200,
        message: "Get User Successful",
        data: req.user,
      });
    }catch(err){
      return res.status(400).json({
        status: 400,
        message: "Get User Failed",
      });
    }

  },
  async index(req,res){
    // #swagger.tags = ['Users']
    try {
      let data = await UserService.getIndex(req.params.id);
      return res.status(200).json({
        status: 200,
        message: "Get User Successful",
        data: data,
      });
    }catch(err){
      return res.status(400).json({
        status: 400,
        message: "Get User Failed",
      });
    }
  }


};
