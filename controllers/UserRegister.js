const UserRegister = require("../models/UserRegister");
const bcrypt = require("bcrypt");

exports.userRegister = async (req, res) => {
  try {
    const { username, mobilenumber, email, password } = req.body;

    // Check if the user already exists by email or mobile number
    const existingUser = await UserRegister.findOne({ email });

    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new document using the UserRegister model
    const newUser = new UserRegister({
      username,
      mobilenumber,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("User registration failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getUser = async (req, res) => {
  try {
    const getuser = await UserRegister.find();
    res.send({ status: "ok", data: getuser });
    console.log(getuser, "getuser details");
  } catch (error) {
    console.error("Get User failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

