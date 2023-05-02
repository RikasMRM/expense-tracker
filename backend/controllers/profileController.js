import User from "../models/User.js";

async function getProfile(req, res) {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProfile(req, res) {
  const userId = req.user._id;

  const {
    firstName,
    lastName,
    age,
    dob,
    email,
    addressLine1,
    addressLine2,
    city,
    country,
  } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        age,
        dob,
        email,
        addressLine1,
        addressLine2,
        city,
        country,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  getProfile,
  updateProfile,
};
