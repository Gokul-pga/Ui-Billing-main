const mongoose = require('mongoose');

const AddExpenceSchema = new mongoose.Schema({
  holderName: { type: String, },
  userAccountHolder: { type: String, },
  expenceDetails: { type: String,  },
  expenceAmount: { type: Number, default: 0 },
  paymentMethod: { type: String,  },
  creatore: { type: String, },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  afterexpence:{type: Number, default: 0 }
});

const AddExpence = mongoose.model('addexpence', AddExpenceSchema);
module.exports = AddExpence;