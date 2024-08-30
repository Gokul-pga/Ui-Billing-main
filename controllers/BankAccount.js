const Bankacc = require("../models/BankAccount");

exports.createbankaccount = async (req, res) => {
    try {
      const {  accountno,
        accountholder,
        mobileno,
        accountbalance,creator,nickname,accounttype } = req.body;
  
      // Check if the Product already exists or not
      const existingacc = await Bankacc.findOne({ accountno });
  
      if (existingacc) {
        console.log("Bank account already registered:", productName);
        return res.status(400).json({ message: "Bank account already registered" });
      }
  
  
      // Create a new document using the Products
      const newAccount = new Bankacc({
        accountnumber:accountno,
        accountholder,
        nickname,
        mobileno,
        accountbalance,creator,
        accounttype
      });
  
      // Save the new user to the database
      await newAccount.save();
  
      res.status(201).json({ message: "new bank account registered successfully" });
    } catch (error) {
      console.error("new bank account registration failed:", error);
      res.status(500).json({ error: "Internal server error from create new bank account" });
    }
  };


  exports.Getbankdetails = async (req, res) => {
    try {
      const getallbankacc = await Bankacc.find();
      res.send({ status: "ok", data: getallbankacc });
    } catch (error) {
      console.error("get all bank account failed:", error);
      res.status(500).json({ error: "Internal server error from get all bank account" });
    }
  };

   
  exports.updateAccountType = async (req, res) => {
    const { id } = req.body;
  
    try {
      // Set the selected account's accounttype to "default"
      await Bankacc.findByIdAndUpdate(id, { accounttype: 'default' });
  
      // Set all other accounts' accounttype to an empty string
      await Bankacc.updateMany(
        { _id: { $ne: id } }, // All documents except the one with the specified id
        { accounttype: '' }   // Set accounttype to an empty string
      );

      // Broadcast the update to all connected WebSocket clients
      const broadcast = req.app.get('broadcast');
      broadcast({ type: 'defaultAccountUpdated', data: { id } });
  
      res.status(200).send({ status: "Account type updated successfully" });
    } catch (error) {
      console.error("Error updating account type:", error);
      res.status(500).send({ status: "Error updating account type" });
    }
};

  
exports.deleteBankAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBankAcc = await Bankacc.findById(id);
    await Bankacc.deleteOne(deleteBankAcc);
    res.send({ status: "deleted BAnk Account" });
  } catch (error) {
    console.log(error, "delete user error in backend");
  }
};