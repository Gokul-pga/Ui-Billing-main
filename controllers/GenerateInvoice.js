const CustomerDetails = require("../models/CustomerDetails");
const GenerateInvoice = require("../models/GenerateInvoice");
const StockUpdate = require("../models/Stockupdate");

exports.addInvoice = async (req, res) => {
  const {
    ShopName,
    shopAddress,
    mobNum1,
    mobNum2,
    creator,
    selectedCustomer,
    findpendingamt,
    totalProductPriceNum,
    totalamount,
    billAmount,
    paidstatus,
    products,
    totalInvoicePaidAmount
  } = req.body;

  console.log(req.body, "Request Body");

  try {
    // Fetch the next bill number
    const invoiceCount = await GenerateInvoice.countDocuments();
    const nextBillNo = invoiceCount === 0 ? 1 : invoiceCount + 1;

    // Process products to handle missing or empty values
    const processedProducts = products.map(product => {
      const quantity1 = parseFloat(product.quantity1 || '0');
      const bag1 = parseFloat(product.bag1 || '0');
      const quantity2 = parseFloat(product.quantity2 || '0');
      const bag2 = parseFloat(product.bag2 || '0');

      const totalPrice = (quantity1 + quantity2) * product.sellingPrice;

      return {
        ...product,
        quantity1,
        bag1,
        quantity2,
        bag2,
        totalPrice
      };
    });

    const newInvoice = new GenerateInvoice({
      ShopName,
      shopAddress,
      mobNum1,
      mobNum2,
      creator,
      customerName: selectedCustomer,
      pendingAmount: findpendingamt,
      grossAmount: totalProductPriceNum,
      totalAmount: totalamount,
      paidstatus,
      totalInvoicePiadAmount: totalInvoicePaidAmount,
      paidamount: billAmount,
      billNo: `${nextBillNo}`, // Ensure billNo is set correctly
      Invoice: processedProducts,
    });

    // Update the stock for each product in the invoice
    for (const product of processedProducts) {
      const { productId, quantity1, quantity2,bag1, bag2 } = product;
      const stockUpdate = await StockUpdate.findOne({ productId });

      if (stockUpdate) {
        const totalQuantity = (quantity1* bag1) + (quantity2* bag2);

        stockUpdate.currentStock -= totalQuantity; // Update stock based on total quantity
        stockUpdate.totalSales += totalQuantity;   // Update total sales based on total quantity
        stockUpdate.lastUpdated = new Date();
        await stockUpdate.save();
      } else {
        console.error(`Stock record not found for product ID: ${productId}`);
      }
    }

    await newInvoice.save();

    console.log("Invoice added successfully");

    // Broadcast the new invoice data to all connected clients
    const broadcast = req.app.get('broadcast');
    broadcast({ type: 'NEW_INVOICE', data: newInvoice });

    res.send({ status: "ok", data: newInvoice });
  } catch (error) {
    console.error("Error from addInvoice:", error);
    res.status(500).send({ status: "Error", error: error.message });
  }
};



  exports.getInvoiceCount = async (req, res) => {
    try {
      const invoiceCount = await GenerateInvoice.countDocuments();
      res.send({ status: "ok", data: invoiceCount  });
    } catch (error) {
      console.error("getInvoice failed:", error);
      res.status(500).json({ error: "Internal server error from getInvoice" });
    }
  };
  exports.getInvoice = async (req, res) => {
    try {
      const invoiceCount = await GenerateInvoice.find();
      res.send({ status: "ok", data: invoiceCount  });
    } catch (error) {
      console.error("getInvoice failed:", error);
      res.status(500).json({ error: "Internal server error from getInvoice" });
    }
  };
  


  exports.getTotalGrossAmount = async (req, res) => {
    try {
      const invoices = await GenerateInvoice.find({}, 'grossAmount'); // Fetch all invoices with only the grossAmount field
      const totalGrossAmount = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.grossAmount || 0), 0);
      res.send({ status: "ok", totalGrossAmount });
    } catch (error) {
      console.error("Failed to get total gross amount:", error);
      res.status(500).json({ error: "Internal server error while calculating total gross amount" });
    }
  };


  exports.getIncomingCashPerDay = async (req, res) => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // Set to midnight of the current day
  
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // Set to the end of the current day
  
      // Find invoices paid today
      const todayInvoices = await GenerateInvoice.find({
        paidstatus: "Paid",
        creationTime: { $gte: startOfDay, $lte: endOfDay },
      }, 'paidamount');
  
      const incomingCashPerDay = todayInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.paidamount || 0), 0);
  
      res.send({ status: "ok", incomingCashPerDay });
    } catch (error) {
      console.error("Failed to get incoming cash per day:", error);
      res.status(500).json({ error: "Internal server error while calculating incoming cash per day" });
    }
  };


  exports.getTotalPaidAmount = async (req, res) => {
    try {
      const invoices = await GenerateInvoice.find({ paidstatus: "Paid" }, 'paidamount');
      const totalPaidAmount = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.paidamount || 0), 0);
      res.send({ status: "ok", totalPaidAmount });
      console.log(totalPaidAmount,"totalPaidAmount");
    } catch (error) {
      console.error("Failed to get total paid amount:", error);
      res.status(500).json({ error: "Internal server error while calculating total paid amount" });
    }
  };

  exports.updatePaidStatus = async (req, res) => {
    try {
      const { id,  pendingamounts,customerName,totalInvoicePiadAmount } = req.body;
      console.log(totalInvoicePiadAmount,"totalInvoicepiadamount");
  
      // Find the invoice by ID and update the paid status, pendingAmount, and paidamount
      const updatedInvoice = await GenerateInvoice.findByIdAndUpdate(
        id,
        { 
          paidstatus: 'Paid',
          pendingAmount: 0, // Update pendingAmount
          paidamount: pendingamounts, // Update paidamount
          lastModified:Date.now(),
          totalInvoicePiadAmount:Number(totalInvoicePiadAmount) + Number(pendingamounts)
        },
        { new: true }
      );

      const updatedcustomerdetails = await CustomerDetails.findOneAndUpdate(
        customerName,
        { 
          pendingAmount: 0, // Update pendingAmount
          lastModified:Date.now()
        },
        { new: true }
      );
      console.log(updatedcustomerdetails,"updatedcustomerdetails");
  
      if (!updatedInvoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      // Broadcast the updated invoice
      const broadcast = req.app.get('broadcast');
      broadcast({ type: 'UPDATE_PAID_STATUS', data: updatedInvoice });
  
      res.status(200).json({ message: 'Invoice updated successfully', updatedInvoice });
    } catch (error) {
      console.error('Error updating invoice:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };