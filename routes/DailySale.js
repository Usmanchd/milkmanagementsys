const express = require('express');
const router = express.Router();
const Sale = require('../models/DailySale');
const Customers = require('../models/Customers');

const myDate = new Date();
const saleDate = {
  date: myDate.getDate(),
  month: myDate.getMonth(),
  year: myDate.getFullYear()
};

router.get('/', async (req, res) => {
  let sale = await Sale.findOne({ saleDate }).populate('sale.customer');
  if (sale) {
    return res.send(sale);
  }

  const customers = await Customers.find();

  sale = new Sale({
    saleDate,
    sale: customers.map(c => {
      return {
        customer: c._id,
        price: 0
      };
    })
  });

  await sale.save();

  res.send(
    await Sale.findOne({
      saleDate
    }).populate('sale.customer')
  );
});

router.post('/', async (req, res) => {
  const id = req.body.id;
  const amount = parseInt(req.body.amount);

  let sale = await Sale.findOne({ saleDate }).populate('sale.customer');

  sale.sale.forEach(s => {
    if (s.id === id) {
      s.price = amount;
    }
  });

  await Sale.findOneAndUpdate(
    { saleDate },
    { $set: { sale: sale.sale } },
    { new: true }
  );

  res.send(sale);
});

router.get('/getall/:month', async (req, res) => {
  let sale = await Sale.find({ 'saleDate.month': month }).populate(
    'sale.customer'
  );
  if (sale) {
    return res.send(sale);
  }
});

router.get('/getalltotal/:month', async (req, res) => {
  const month = req.params.month;

  let sale = await Sale.find({ 'saleDate.month': month }).populate(
    'sale.customer'
  );
  let customers = await Customers.find();

  // PREVIOUS APPROACH!

  // let total = customers.map(c => {
  //   let arr = [];
  //   sale.map(s => {
  //     s.sale.map(ss => {
  //       if (ss.customer.name === c.name) {
  //         console.log(ss.customer, 'customer', ss.price, ss);
  //         arr.push(ss.price);
  //       }
  //     });
  //   });
  //   console.log(arr);
  //   return {
  //     name: c.name,
  //     total: arr.reduce((total, a) => (total += a), 0)
  //   };
  // });

  // NEW APPROACH HASH TABLE

  let total = {};

  sale.map(s => {
    s.sale.map(ss => {
      console.log(ss.price);
      if (total[ss.customer.name]) {
        total[ss.customer.name] += ss.price;
      } else {
        total[ss.customer.name] = ss.price;
      }
    });
  });

  console.log(total);

  res.send(total);
});

module.exports = router;
