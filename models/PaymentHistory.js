const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  customerName: { type: String, required: true },
  amountPaid: { type: String, required: true },
  totalIncomingCash: { type: String, required: true },
  customerName: { type: String, required: true },
  creator: { type: String,  required: true },
  status: { type: Boolean, default: true },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  _class: { type: String, default: "com.avitam.billing.model.Product" }
});

const Product = mongoose.model('customerPaymentHistory', productSchema);

module.exports = Product;
