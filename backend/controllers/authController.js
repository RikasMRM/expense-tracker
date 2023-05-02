import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

async function register(req, res) {
  const {
    firstName,
    lastName,
    age,
    dob,
    email,
    password,
    addressLine1,
    addressLine2,
    city,
    country,
  } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    age,
    dob,
    email,
    password: hashedPassword,
    addressLine1,
    addressLine2,
    city,
    country,
  });

  try {
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({ token });
}

export default {
  register,
  login,
};
