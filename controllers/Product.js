const Product = require("../models/Product");



exports.productPost = async (req, res) => {
  try {
    const { image,productName,purchasePrice,sellingPrice,creator } = req.body;

    // Check if the Product already exists or not
    const oldproduct = await Product.findOne({ productName });

    if (oldproduct) {
      console.log("Product already registered:", productName);
      return res.status(400).json({ message: "Product already registered" });
    }


    // Create a new document using the Products
    const newProduct = new Product({
      image,
      productName,
      purchasePrice,
      sellingPrice,
      creator
    });

    // Save the new user to the database
    await newProduct.save();

    res.status(201).json({ message: "newProduct registered successfully" });
  } catch (error) {
    console.error("newProduct registration failed:", error);
    res.status(500).json({ error: "Internal server error from productPost" });
  }
};



// Function to fetch products and convert image from base64 to binary
exports.GetProduct = async (req, res) => {
  try {
    const getallproducts = await Product.find();
    res.send({ status: "ok", data: getallproducts });
    // console.log(getallproducts, "getproduct details");
  } catch (error) {
    console.error("getproduct failed:", error);
    res.status(500).json({ error: "Internal server error from getproduct" });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await Product.findById(id);
    await Product.deleteOne(deleteProduct);
    res.send({ status: "deleted" });
  } catch (error) {
    console.log(error, "delete user error in backend");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {  newPurchasePrice,
      newSellingPrice } = req.body;
    console.log(req.body,"req.body");
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      
      purchasePrice:newPurchasePrice,
      sellingPrice:newSellingPrice,
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send({ data: updatedProduct });
  } catch (error) {
    res.status(500).send({ message: "Error updating product" });
  }
};


