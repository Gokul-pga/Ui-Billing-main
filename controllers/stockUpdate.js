const StockUpdate = require("../models/Stockupdate");

// Fetch stock data for a specific product
exports.getStockData = async (req, res) => {
  try {
    const { productId } = req.params;
    const stockData = await StockUpdate.findOne({ productId });

    if (stockData) {
      return res.send({ status: "ok", data: stockData });
    }
    return res.status(404).json({ message: 'Stock data not found' });
  } catch (error) {
    console.error('Error fetching stock data:', error); // Detailed error logging
    res.status(500).json({ message: 'Error fetching stock data', error: error.message });
  }
};

exports.updateStockData = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId, "Product ID");

    const { totalPurchase, totalSales } = req.body;

    // Find the existing stock data for the product
    const existingStock = await StockUpdate.findOne({ productId });

    let updatedStockData;

    if (existingStock) {
      // Calculate the new currentStock
      const newCurrentStock = existingStock.currentStock + totalPurchase;

      // Update the stock data with the new currentStock and totalSales
      updatedStockData = await StockUpdate.findOneAndUpdate(
        { productId },
        {
          currentStock: newCurrentStock, 
          totalPurchase: totalPurchase,
          totalSales,
          lastUpdated: Date.now(),
        },
        { new: true }
      );
    } else {
      // If no existing record, create a new one with the given currentStock and totalPurchase
      updatedStockData = await StockUpdate.findOneAndUpdate(
        { productId },
        {
          currentStock: totalPurchase,
          totalPurchase :totalPurchase,
          totalSales,
          lastUpdated: Date.now(),
        },
        { new: true, upsert: true }
      );
    }

    res.json(updatedStockData);
  } catch (error) {
    console.error('Error updating stock data:', error);
    res.status(500).json({ message: 'Error updating stock data', error });
  }
};


