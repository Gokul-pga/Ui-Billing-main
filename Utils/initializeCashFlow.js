const CashFlow = require("../models/CashFlow");


const initializeCashFlow = async () => {
  try {
    const existingCashFlow = await CashFlow.findOne();
    if (!existingCashFlow) {
      const newCashFlow = new CashFlow();
      await newCashFlow.save();
      console.log("Initialized cash flow document.");
    }
  } catch (error) {
    console.error("Error initializing cash flow:", error);
  }
};

module.exports = initializeCashFlow;