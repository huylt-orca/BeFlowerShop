const db = require("../models/index");
const crypto = require("crypto");

let createPayment = (idorder, total,paymentmethod) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = crypto.randomBytes(15).toString("hex");
      let data = await db.Payment.create({
        idpayment: id,
        idorder: idorder,
        total: total,
        paymentmethod: paymentmethod
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getPayment = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Payment.findAll(
          {
            attributes: ['total'],
            where: {
              idpayment: id
            }
          }
        );
        console.log("_________");
        console.log(data[0].total);
        resolve(data[0].total);
      } catch (e) {
        reject(e);
      }
    });
  };

let updatePayment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Payment.update(
        {
          status: 1,
        },
        {
          where: {
            idpayment: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deletePayment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Payment.destroy(
        {
          where: {
            idpayment: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment
};
