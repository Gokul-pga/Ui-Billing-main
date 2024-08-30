const mongoose = require('mongoose');

const AddIncomeSchema = new mongoose.Schema({
  holderName: { type: String, },
  userAccountHolder: { type: String, },
  expenceDetails: { type: String,  },
  expenceAmount: { type: Number, default: 0 },
  paymentMethod: { type: String,  },
  creatore: { type: String, },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  afterAmount:{type: Number, default: 0 }
});

const AddIncome = mongoose.model('addincome', AddIncomeSchema);
module.exports = AddIncome;