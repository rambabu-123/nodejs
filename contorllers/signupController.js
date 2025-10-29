const Signup = require('../models/signup');

const createusers = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;


    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const signup = new Signup({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,          
      confirmPassword, 
    });

  
    await signup.save();

  
    res.status(201).json({
      message: "User registered successfully",
      signup
    });

  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createusers };
