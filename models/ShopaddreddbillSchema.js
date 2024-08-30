const mongoose = require('mongoose');
const {Schema} = mongoose;

const shopaddreddbillSchema = new Schema({
  shopName: {type: String, required: true},
  imageURL: {type: String, required: true}, // Assuming image is stored as a base64 encoded string
  shopsalename: {type: String, required: true},
  address: {type: String, required: true},
  mobilenum1: {type: Number, required: true},
  mobilenum2: {type: Number, required: true},
  creator: {type: String},
  status: {type: Boolean, default: true},
  creationTime: {type: Date, default: Date.now},
  lastModified: {type: Date, default: Date.now},
  _class: {type: String, default: 'com.avitam.billing.model.Product'},
});

const Bill = mongoose.model('billschema', shopaddreddbillSchema);

module.exports = Bill;
