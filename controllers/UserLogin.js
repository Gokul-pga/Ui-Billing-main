const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRegister = require("../models/UserRegister");
const SECRET_KEY = "wfgksdfninqkfofnndakfw325";
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserRegister.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      // { expiresIn: "1h" }
    );

    res.status(200).json({ token,email });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await UserRegister.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send email with the reset link
    const resetUrl = `http://your-frontend-url/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      to: email,
      from: 'Avitamadmin@gmail.com',
      subject: 'Password Reset',
      html: `<p>You requested a password reset</p><p>Click <a href="${resetUrl}">here</a> to reset your password</p>`
    });

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error("Forgot password failed from backend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
