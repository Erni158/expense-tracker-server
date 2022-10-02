const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name, email, password
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User Occured!");
  }

});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(500);
    throw new Error("Invalid Email or Password!");
  }
});

const profile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.send(req.user);
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
});

const tokenCheck = asyncHandler(async (req, res) => {
  res.status(200).send({ status: "OK" });
})

module.exports = { registerUser, authUser, tokenCheck, profile }