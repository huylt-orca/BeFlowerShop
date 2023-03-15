const paypal = require("paypal-rest-sdk");
const Firebase = require("../services/Firebase");
const CartService = require("../services/CartService");

// const PayService = require("../services/PayService");
// const OrderService = require("../services/OrderService");
// const OrderDetailService = require("../services/OrderDetailService");

module.exports = {
  async pay(req, res) {
    /* 
            #swagger.tags = ['Payment']
             #swagger.description = "payment by paypal"
            */
    try {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      // const idpayment = req.query.idpayment;
      // const idorder = req.query.idorder;
      const total = req.query.total;
      const userID = req.query.userID;

      // const total = await PayService.getPayment(idpayment);
      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: total,
            },
          },
        ],
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        async function (error, payment) {
          if (error) {
            console.log(error.response);
            throw error;
          } else {
            // console.log(JSON.stringify(payment));
            console.log("________mua hang thanh cong");
            //set lai cart
            // CartService.cleanCart(userID);
            // Firebase.pushNoti()
            res.send("Success (Mua hàng thành công)");
          }
        }
      );
    } catch (error) {
      console.log("____(pay) err"+ error);
    }
  },
};
