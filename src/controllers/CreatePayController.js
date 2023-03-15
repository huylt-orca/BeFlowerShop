const paypal = require("paypal-rest-sdk");
// const PayService = require("../services/PayService");
const Invoice = require("../services/InvoiceService");
const Cart = require("../services/CartService");

module.exports = {
  async create_pay(req, res) {
    /* 
            #swagger.tags = ['Payment']
             #swagger.description = "payment by paypal"
            */
    try {
      // const items_cart = req.body.items_cart;
      // const total = req.body.total;
      // const idorder = req.body.idorder;

      const userId = req.body.userId;
      const data = req.body.data;
      // const total = req.body.total;

      // let idpayment = await PayService.createPayment(idorder,total,"paypal")
      const items_cart = await Cart.getAllProductByUserId(userId, data);
      await Invoice.create(data, userId);

      let items = items_cart.map((item, index, array) => {
        return {
          name: item.name,
          sku: item.id,
          price: item.price,
          currency: "USD",
          quantity: item.Carts.quantity,
        };
      });
      let total = items.reduce(((accumulator, item)=>{
        return accumulator + item.price*item.quantity
      }),0);

      console.log(items);
      console.log(total);

      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: `http://localhost:8080/api/success/?total=${total}&userID=${userId}`,
          cancel_url: "http://localhost:8080/api/cancel",
          //   return_url: `https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/success?idpayment=${idpayment.idpayment}&idorder=${idorder}`,
          //   cancel_url: `https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/cancel`,
        },
        transactions: [
          {
            // item_list: {
            //   items: [
            //     {
            //       name: "Iphone 4S",
            //       sku: "001",
            //       price: "25.00",
            //       currency: "USD",
            //       quantity: 2,
            //     },
            //     {
            //       name: "Iphone 5S",
            //       sku: "002",
            //       price: "50.00",
            //       currency: "USD",
            //       quantity: 1,
            //     },
            //   ],
            // },
            item_list: {
              items: items,
            },
            amount: {
              currency: "USD",
              total: total.toString(),
            },
            description: "paypal for flower",
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          console.log(error);
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              console.log(payment.links[i].href);
              res.redirect(payment.links[i].href);
            }
          }
        }
      });
    } catch (error) {
      console.log("______(createpay) err");
    }
  },
};
