const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockUpdateSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Ensure 'Product' is the correct model name
  currentStock: { type: Number, default: 0 },
  totalPurchase: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

const StockUpdate = mongoose.model('StockUpdate', stockUpdateSchema);

module.exports = StockUpdate;

