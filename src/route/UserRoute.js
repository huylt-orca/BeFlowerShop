const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

let route =  express.Router();



route.post('/signup',upload.single('avatar'),UserController.signup);
route.post('/login',UserController.login);
route.put('/',UserController.update);
route.get('/:token',AuthController.authentication,UserController.getAll);
route.post('/getNewToken', AuthController.getNewTokenFromRefreshToken);


module.exports = route;