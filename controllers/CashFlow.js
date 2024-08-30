const CashFlow = require("../models/CashFlow");

// Helper function to get or create a cash flow record for a specific date
const getOrCreateCashFlow = async (date) => {
  let cashFlow = await CashFlow.findOne({ date });
  if (!cashFlow) {
    cashFlow = new CashFlow({ date });
  }
  return cashFlow;
};

exports.updateCashFlow = async (req, res) => {
  const { amount, type } = req.body;
  const today = new Date().setHours(0, 0, 0, 0); // Start of today

  try {
    if (amount == null || !type) {
      return res.status(400).json({ status: "error", error: "Missing amount or type" });
    }

    let cashFlow = await getOrCreateCashFlow(today);

    if (type === "outgoing") {
      cashFlow.outgoingCash += amount;
    } else if (type === "borrowing") {
      cashFlow.borrowingCash += amount;
    } else {
      return res.status(400).json({ status: "error", error: "Invalid type" });
    }

    cashFlow.grandTotal = cashFlow.todaysIncome + cashFlow.closingAmount;

    await cashFlow.save();

    res.json({
      status: "ok",
      cashFlow: {
        grandTotal: cashFlow.grandTotal,
        totalOutgoing: cashFlow.outgoingCash,
        totalBorrowing: cashFlow.borrowingCash,
        todaysIncome: cashFlow.todaysIncome,
        closingAmount: cashFlow.closingAmount,
      },
    });
  } catch (error) {
    console.error("Error updating cash flow:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.updateTodayIncome = async (req, res) => {
  const { todayIncome } = req.body;
  const today = new Date().setHours(0, 0, 0, 0); // Start of today

  try {
    if (todayIncome == null) {
      return res.status(400).json({ status: "error", error: "Today's income is missing" });
    }

    let cashFlow = await getOrCreateCashFlow(today);

    cashFlow.todaysIncome += todayIncome;
    cashFlow.grandTotal = cashFlow.todaysIncome + cashFlow.closingAmount;

    await cashFlow.save();

    res.json({
      status: "ok",
      todaysIncome: cashFlow.todaysIncome,
      grandTotal: cashFlow.grandTotal,
    });
  } catch (error) {
    console.error("Error updating today's income:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.resetDailyValues = async (req, res) => {
  const today = new Date().setHours(0, 0, 0, 0); // Start of today

  try {
    const cashFlow = await getOrCreateCashFlow(today);

    cashFlow.closingAmount = cashFlow.grandTotal;
    cashFlow.todaysIncome = 0;
    cashFlow.outgoingCash = 0;
    cashFlow.borrowingCash = 0;

    await cashFlow.save();

    res.json({
      status: "ok",
      closingAmount: cashFlow.closingAmount,
      grandTotal: cashFlow.grandTotal,
    });
  } catch (error) {
    console.error("Error resetting daily values:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.getHistoricalData = async (req, res) => {
  const { date } = req.query;
  
  try {
    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0); // Set to start of the day

    console.log("Query Date:", queryDate); // Log the query date

    const cashFlow = await CashFlow.findOne({ date: queryDate });

    if (!cashFlow) {
      console.log("No cash flow found for date:", queryDate); // Log if no document found
      return res.status(404).json({ status: "error", error: "Cash flow not found" });
    }

    res.json({
      status: "ok",
      cashFlow,
    });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};