const CustomerDetails = require("../models/CustomerDetails");

exports.customerCreate = async (req, res) => {
    try {
      const { customerName,mobileNumber,address,creator } = req.body;
  
      // Check if the Product already exists or not
      const existingShop = await CustomerDetails.findOne({ customerName });
  
      if (existingShop) {
        console.log('customer already registered:', shopName);
        return res.status(400).json({ message: 'customer already registered' });
      }
  
      // Create a new document using the Products
      const newCustomer = new CustomerDetails({
        customerName,mobileNumber,address,creator
      });
  
      // Save the new user to the database
      await newCustomer.save();
      const broadcast = req.app.get('broadcast');
      broadcast({ type: 'CREATE_CUSTOMER', data: newCustomer });
  
      res.status(201).json({ message: 'customer registered successfully' });
    } catch (error) {
      console.error('customer registration failed:', error);
      res.status(500).json({ error: 'Internal server error from customer' });
    }
  };


  exports.getCustomerDetails = async (req, res) => {
    try {
      const getallcustomerdetails = await CustomerDetails.find();
      res.send({ status: "ok", data: getallcustomerdetails });
      console.log(getallcustomerdetails, "getcustomer details");
    } catch (error) {
      console.error("getcustomer details failed:", error);
      res.status(500).json({ error: "Internal server error from getcustomer" });
    }
  };

  
  exports.updatePendingAmt = async (req, res) => {
    const { pendingamount, selectedCustomer } = req.body;
  
    try {
      // Find the customer by name
      const customer = await CustomerDetails.findOne({ customerName: selectedCustomer });
  
      // If customer not found, send an error response
      if (!customer) {
        return res.status(404).send({ status: "Customer not found in database" });
      }
  
      // Convert pendingamount to a number
      const amountToAdd = Number(pendingamount);
  
      if (isNaN(amountToAdd)) {
        return res.status(400).send({ status: "Invalid amount" });
      }
  
      // Ensure customer's pendingAmount is a number
      const currentPendingAmount = parseFloat(customer.pendingAmount) || 0;
  
      // Calculate the new pending amount
      const newPendingAmount = amountToAdd;
      // const newPendingAmount = currentPendingAmount + amountToAdd;
  
      // Update the customer's pending amount
      const updatedPendingAmount = await CustomerDetails.findOneAndUpdate(
        { customerName: selectedCustomer },
        { pendingAmount: newPendingAmount.toString(), lastModified: Date.now() }, // Set the new pending amount and update lastModified
        { new: true } // Return the updated document
      );
  
      console.log(updatedPendingAmount, "updatedPendingAmount");
      res.send({ status: "Updated successfully", updatedPendingAmount });
    } catch (error) {
      console.log(error, "Error updating pending amount in backend");
      res.status(500).send({ status: "Error updating pending amount" });
    }
  };
  

  exports.deleteCustomer = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Find the customer by ID
      const customer = await CustomerDetails.findById(id);
  
      if (!customer) {
        return res.status(404).send({ status: "Customer not found" });
      }
  
      // Check if the customer has any pending amount
      // if (parseFloat(customer.pendingAmount) > 0) {
      //   return res.status(400).send({ status: "* Cannot delete customer with pending amount" });
      // }
  
      // Delete the customer if no pending amount
      await CustomerDetails.deleteOne({ _id: id });
  
      res.send({ status: "Customer deleted successfully" });
    } catch (error) {
      console.log(error, "Error deleting customer in backend");
      res.status(500).send({ status: "Error deleting customer" });
    }
  };
  
