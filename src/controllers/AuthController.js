const UserService = require("../services/UserService");
const Utils = require("../utils/utils");

module.exports = {
  async authentication (req, res, next){
    try {
        let token = Utils.getTokenFromHeader(req); 
        let result = Utils.getDataFromToken(token);
        if (result){
          let user = await UserService.getIndex(result.data);
          req.user = user;
            next();
        }
         else {
          res.json('Please Login');
        }
    } catch(e){
      res.json(e);
    }
},

  async checkAdmin(req,res, next){
      let user = req.user; 
      if (user.role === 0){
          next();
      }
       else {
        res.json('Not Permission');
      }
  },

  async checkUser(req,res, next){
    let user = req.user; 
      if (user.role === 1){
          next();
      }
       else {
        res.json('Not Permission');
      }
  },
  
   async getNewTokenFromRefreshToken(req, res){
    let refreshToken = req.body.refreshToken;
    let tokenGet = Utils.getDataFromRefreshToken(refreshToken);
    let token = Utils.generateToken(tokenGet.data);
    res.json({token:token});
   },
};