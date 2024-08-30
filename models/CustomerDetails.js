const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  pendingAmount: { type: String,default:0 },
  creator: { type: String, required: true },
  status: { type: Boolean,  },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  _class: { type: String, default: 'com.avitam.billing.model.Customer' }
});

const CustomerDetails = mongoose.model('customerdetails', customerSchema);

module.exports = CustomerDetails;
