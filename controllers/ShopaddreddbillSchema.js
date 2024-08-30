const Bill = require("../models/ShopaddreddbillSchema");

exports.shopBillCreate = async (req, res) => {
  try {
    const { shopName, shopsalename, address, mobilenum1, mobilenum2, imageURL } = req.body;

    // Check if the Product already exists or not
    const existingShop = await Bill.findOne({ shopName });

    if (existingShop) {
      console.log('ShopName already registered:', shopName);
      return res.status(400).json({ message: 'ShopName already registered' });
    }

    // Create a new document using the Products
    const newShop = new Bill({
      shopName,
      shopsalename,
      address,
      mobilenum1,
      mobilenum2,
      imageURL
    });

    // Save the new user to the database
    await newShop.save();

    res.status(201).json({ message: 'ShopName registered successfully' });
  } catch (error) {
    console.error('ShopName registration failed:', error);
    res.status(500).json({ error: 'Internal server error from ShopName' });
  }
};
