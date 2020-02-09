const mongoose = require('mongoose');
// const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const CustomersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: Number
  },
  address: {
    type: String
  }
});

// CustomersSchema.plugin(mongooseUniqueValidator);

module.exports = Customers = mongoose.model('Customers', CustomersSchema);
