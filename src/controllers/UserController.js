const UserService = require("../services/UserService");
const {getDataFromToken, getDataFromRefreshToken, generateToken} = require("../utils/utils");
const Firebase = require('../services/Firebase');

module.exports = {
  async login(req, res) {
    let data = await UserService.login(req.body);
    return res.status(200).json({
      status: 200,
      message: "Login",
      data: data,
    });
  },

  async signup(req, res) {
    
    try {
      req.body.image = await Firebase.uploadImage(req.file);
      let data = await UserService.createNewUser(req.body);
      return res.status(200).json({
        status: 200,
        message: "Signup",
        data: data,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async getAll(req, res) {
    try {
      let data = await UserService.getAll(req.query);
      return res.status(200).json({
        status: 200,
        message: "Get All User Successful",
        data: data,
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
      if (req.file){
        req.body.image = await Firebase.uploadImage(req.file);
      }
      let data = await UserService.update(req.body,req.body.id);
      return res.status(200).json({
        status: 200,
        message: "Update User Successful",
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
