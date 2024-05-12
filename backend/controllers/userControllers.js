const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) { //if anyone is not filled then give error
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email }); //user is model

  if (userExists) {   
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ //create new user
    name,
    email,
    password,
    pic,
  });

  if (user) {  //new user successfully added 
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id), //generate jwt token to authrised user from backend
    });
  } else { //failed to create new user 
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //to login our user

  const user = await User.findOne({ email }); //check exist in our database or not

  if (user && (await user.matchPassword(password))) { //if user exit and password match
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [  //any of the queary matches
          { name: { $regex: req.query.search, $options: "i" } }, //to filter in mongo db we use Regex
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
  res.send(users);
});

module.exports = {registerUser,authUser,allUsers};