const AddExpence = require("../models/AddExpence");
const BankAccount = require("../models/BankAccount"); // Import your BankAccount model

exports.addIncome = async (req, res) => {
    try {
        const {
            
            holderName,
            userAccountHolder,
            expenseDetails,
            expenceAmount,
            paymentMethod,
            creatore,
            afterIncome,
        } = req.body;

        // Fetch the default bank account
        const defaultBankAcc = await BankAccount.findOne({ accounttype: 'default' });

        if (!defaultBankAcc) {
            return res.status(400).json({ error: 'Default bank account not found' });
        }

        if (defaultBankAcc.accountbalance < expenceAmount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Create a new income entry
        const newIncome = new AddExpence({
            holderName,
            userAccountHolder,
            expenceDetails:expenseDetails,
            expenceAmount,
            paymentMethod,
            creatore,
            afterexpence:afterIncome
        });

        // Save the income entry
        await newIncome.save();

        // Update the bank account balance
        defaultBankAcc.accountbalance -= expenceAmount;
        await defaultBankAcc.save();

        res.status(201).json(newIncome);
    } catch (error) {
        console.error('Failed to add expense entry:', error);
        res.status(500).json({ error: 'Failed to add expense entry' });
    }
};


exports.Getexpensehistory = async (req, res) => {
    try {
      const getallexpensehistory = await AddExpence.find();
      res.send({ status: "ok", data: getallexpensehistory });
      // console.log(getallproducts, "getproduct details");
    } catch (error) {
      console.error("getproduct failed:", error);
      res.status(500).json({ error: "Internal server error from getproduct" });
    }
  };