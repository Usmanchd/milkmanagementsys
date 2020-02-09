const mongoose = require('mongoose');
// const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const SaleSchema = new mongoose.Schema({
  saleDate: {
    date: { type: Number },
    month: { type: Number },
    year: { type: Number }
  },
  sale: [
    {
      customer: { type: Schema.Types.ObjectId, ref: 'Customers' },
      price: { type: Number, default: 0 }
    }
  ]
});

// SaleSchema.plugin(mongooseUniqueValidator);

module.exports = Sale = mongoose.model('Sale', SaleSchema);
