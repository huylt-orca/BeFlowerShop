const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const multer = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024*1024
})

const upload = multer({ dest: 'uploads/' });

let route =  express.Router();



route.post('/signup',Multer.single('image'),UserController.signup);
route.post('/login',UserController.login);
route.put('/',Multer.single('image'),UserController.update);
route.get('/',UserController.getAll);

// route.get('/:token',AuthController.authentication,UserController.getAll);
route.post('/getNewToken', AuthController.getNewTokenFromRefreshToken);


module.exports = route;