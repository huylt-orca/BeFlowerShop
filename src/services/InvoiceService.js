const { Op, Sequelize } = require("sequelize");
const db = require("../models/index");

let getAllByUserId = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.limit) {
        data.limit = 10;
      } else {
        data.limit = parseInt(data.limit);
      }
      let invoices = await db.Invoice.findAll({
        where: {
          userId: parseInt(userId),
        },
        offset: (data.page - 1) * data.limit || 0,
        limit: data.limit,
      });
      resolve(invoices);
    } catch (e) {
      reject(e);
    }
  });
};

let create = (data, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newData = await checkProducts(data.products);
      // console.log("________________");
      // console.log(newData);
      let invoice = await db.Invoice.create({
        userId: userId,
        createDate: new Date(),
        phone: data.phone,
        price: newData.total,
        description: data.description,
      });

      await data.products.forEach(async (product, index) => {
        await db.InvoiceProduct.create({
          invoiceId: invoice.id,
          productId: product.productId,
          quantity: product.quantity,
          price: newData.listProduct[index].price,
        });
        await db.Product.update(
          {
            quantity: Sequelize.literal(`quantity - ${product.quantity}`),
          },
          {
            where: {
              id: product.productId,
            },
          }
        );
        await db.Cart.destroy({
          where: {
            userId: userId,
            productId: product.productId,
          },
        });
      });

      await db.Invoice.update(
        {
          price: newData.total,
        },
        {
          where: {
            id: invoice.id,
          },
        }
      );
      console.log("___________");
        console.log(invoice);
      resolve(invoice.id);
    } catch (e) {
      reject(e);
    }
  });
};

let checkProducts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newData = {};
      newData.total = 0;
      newData.listProduct = [];
      data.forEach(async (product) => {
        let tmp = await db.Product.findOne({
          where: {
            [Op.and]: [
              {
                id: product.productId,
              },
              {
                quantity: {
                  [Op.gte]: product.quantity,
                },
              },
              {
                status: 1,
              },
            ],
          },
        });

        if (!tmp) {
          reject("Product is out of stock");
        }
        newData.total += product.quantity * tmp.price;
        newData.listProduct.push(tmp);
      });
      resolve(newData);
    } catch (error) {
        console.log("___(errcheckProducts)");
    }
  });
};

let getIndex = (invoiceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let invoice = await db.Invoice.findByPk(invoiceId);
      let products = await db.Product.findAll({
        include: [
          {
            model: db.InvoiceProduct,
            where: {
              invoiceId: invoiceId,
            },
          },
        ],
        raw: true,
        nest: true,
      });

      for (let i = 0; i < products.length; i++) {
        products[i].quantity = products[i].InvoiceProducts.quantity;
        products[i].price = products[i].InvoiceProducts.price;
        delete products[i].InvoiceProducts;
      }

      invoice.products = products;
      resolve(invoice);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllByDate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.limit) {
        data.limit = null; 
      } else {
        data.limit = parseInt(data.limit);
      }
      if (!data.ascending){
        data.ascending ='DESC'
      }
      if (!data.startDate){
        data.startDate = '2020-01-01';
      }
      if (!data.endDate){
        data.endDate = new Date();
      }

      let invoices = await db.Invoice.findAll({
        where: {
          createDate: {
            [Op.between]: [data.startDate, data.endDate]
          }
        },
        order: [
          ['createDate', data.ascending]
        ],
        offset: (data.page - 1) * data.limit || 0,
        limit: data.limit,
      });
      
      resolve(invoices);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getAllByUserId: getAllByUserId,
  create: create,
  getIndex: getIndex,
  getAllByDate: getAllByDate
};
