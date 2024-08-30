const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  image: { type: String, }, // Assuming image is stored as a base64 encoded string
  sellingPrice: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  creator: { type: String,  required: true },
  status: { type: Boolean, default: true },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  _class: { type: String, default: "com.avitam.billing.model.Product" }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
