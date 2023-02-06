const UserService = require('../services/TestService');
const db = require('../models/index');

let createNewUser = async(req,res)=>{
    let message = await UserService.createNewUser(req.body);
    console.log(message);
    return res.send(message);
}

let createNewCategory = async(req, res)=>{
    await db.Tepes.create({name:"hlelo2", description:"kdlsfal"});
    res.send("succ");
}

let findTepes = async(req, res)=>{
    let data = await db.Tepes.findByPk(req.params.id);
    res.json(data);
}

let edit = async(req, res) =>{
    let userid = req.query.id;
    let userData = await UserService.editUser(userid);
}

module.exports= {
    createNewUser: createNewUser,
    findTepes: findTepes,
    createNewCategory: createNewCategory
}