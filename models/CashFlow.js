const mongoose = require('mongoose');

const cashFlowSchema = new mongoose.Schema({
  date: {  type: Date, default: Date.now },
  todaysIncome: { type: Number, default: 0 },
  outgoingCash: { type: Number, default: 0 },
  borrowingCash: { type: Number, default: 0 },
  closingAmount: { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 }
});

const CashFlow = mongoose.model('CashFlow', cashFlowSchema);
module.exports = CashFlow;