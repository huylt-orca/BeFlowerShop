const promiseRouter = require("express-promise-router");

let route = promiseRouter();
route.get("/", (req, res) => {
  /* 
            #swagger.tags = ['Payment']
             #swagger.description = "payment by paypal"
            */
  res.send('Cancelled (Đơn hàng đã hủy)');
});

module.exports = route;
