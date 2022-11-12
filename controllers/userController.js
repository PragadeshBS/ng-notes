const User = require("../models/userModel");

const getUserDetails = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email }).select("-password");
  if (user) return res.status(200).json(user);
  return res.status(400).json({ err: "No such user" });
};

module.exports = {
  getUserDetails,
};
