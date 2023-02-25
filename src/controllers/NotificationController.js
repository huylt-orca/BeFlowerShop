const Firebase = require('../services/Firebase');

module.exports = {

  async create(req, res) {// #swagger.ignore = true
    try {
        const { token, title, message } = req.body;
        const notif = await Firebase.sendPushNotification(token, title, message);

      return res.status(200).json({
        status: 200,
        message: notif,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

};