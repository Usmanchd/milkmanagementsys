const express = require('express');
const router = express.Router();
const Customers = require('../models/Customers');
const Sale = require('../models/DailySale');

const myDate = new Date();
const saleDate = {
  date: myDate.getDate(),
  month: myDate.getMonth(),
  year: myDate.getFullYear()
};

router.post('/', async (req, res) => {
  const name = req.body.name;
  const contact = req.body.contact;
  const address = req.body.address;

  console.log(name, contact, address);
  const customer = new Customers({
    name,
    contact,
    address
  });

  let newcust = await customer.save();

  let sale = await Sale.findOne({ saleDate });
  let userObj = { customer: newcust._id, price: 0 };
  sale.sale.push(userObj);

  let updatedSale = await Sale.findOneAndUpdate(
    { saleDate },
    { sale: sale.sale },
    { new: true }
  );

  res.send(updatedSale);
});

module.exports = router;
