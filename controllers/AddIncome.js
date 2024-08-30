const AddIncome = require("../models/AddIncome");
const Bankacc = require("../models/BankAccount");

// Add a new income entry with all fields
exports.addIncome = async (req, res) => {
    try {
        const {
            holderName,
            expenceDetails,
            expenceAmount,
            paymentMethod,
            creatore,
            afterexpence,
            ownerAccount
        } = req.body;

        console.log(req.body, "add income content");

        // Fetch the default bank account
        const defaultBankAcc = await Bankacc.findOne({ accounttype: 'default' });

        if (!defaultBankAcc) {
            return res.status(400).json({ error: 'Default bank account not found' });
        }

        // Fetch the existing account by accountholder (ownerAccount)
        const existingAcc = await Bankacc.findOne({ accountholder: ownerAccount });

        if (!existingAcc) {
            return res.status(400).json({ error: `Bank account for ${ownerAccount} not found` });
        }

        // Update the accountbalance
        existingAcc.accountbalance = afterexpence;

        // Save the updated bank account
        await existingAcc.save();

        // Create a new income entry
        const newIncome = new AddIncome({
            holderName,
            userAccountHolder:ownerAccount,
            expenceDetails,
            expenceAmount,
            paymentMethod,
            creatore,
            afterAmount: afterexpence
        });

        // Save the income entry
        await newIncome.save();

        // Respond with the newly created income entry
        res.status(201).json(newIncome);
    } catch (error) {
        console.error('Failed to add income entry:', error);
        res.status(500).json({ error: 'Failed to add income entry' });
    }
};


exports.addExistingAccount = async (req, res) => {
    try {
      const {
        holderName,
        selectedAccId,
        expenceAmount,
        paymentMethod,
        creatore,
        afterexpence,
      } = req.body;
  
      // Fetch the default bank account
      const defaultBankAcc = await Bankacc.findOne({ accounttype: 'default' });
  
      if (!defaultBankAcc) {
        return res.status(400).json({ error: 'Default bank account not found' });
      }
  
      // Fetch the selected account by its ID
      const selectedAcc = await Bankacc.findById(selectedAccId);
  
      if (!selectedAcc) {
        return res.status(400).json({ error: `Selected bank account not found` });
      }
  
      // Deduct the amount from the default account's balance
      defaultBankAcc.accountbalance = afterexpence;
  
      // Add the amount to the selected account's balance
      selectedAcc.accountbalance += expenceAmount;
  
      // Save both updated accounts
      await defaultBankAcc.save();
      await selectedAcc.save();
  

    } catch (error) {
      console.error('Failed to add income entry:', error);
      res.status(500).json({ error: 'Failed to add income entry' });
    }
  };
  


  exports.Getincomehistory = async (req, res) => {
    try {
      const getallincomehistory = await AddIncome.find();
      res.send({ status: "ok", data: getallincomehistory });
      // console.log(getallproducts, "getproduct details");
    } catch (error) {
      console.error("getproduct failed:", error);
      res.status(500).json({ error: "Internal server error from getproduct" });
    }
  };