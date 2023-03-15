const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const multer = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024*1024*20
})

const upload = multer({ dest: 'uploads/' });

let route =  express.Router();

route.post('/getNewToken', AuthController.getNewTokenFromRefreshToken);
route.get("/getUserByAccessToken",AuthController.authentication,UserController.getUserByToken);


route.post('/signup',Multer.single('image'),UserController.signup);
route.post('/login',UserController.login);
route.get("/:id",UserController.index);
route.put('/',Multer.single('image'),UserController.update);
route.get('/',UserController.getAll);

// route.get('/:token',AuthController.authentication,UserController.getAll);


module.exports = route;