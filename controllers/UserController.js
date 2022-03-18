const { compareSync } = require("bcryptjs");
const Joi = require("joi");
const {
  generateAccessToken,
  generateRefreshToken,
  logout,
  refreshToken,
} = require("../middleware/auth");
const User = require("../model/User");

const validator = async (data) => {
  try {
    const schema = Joi.object({ 
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(15).required(), 
    });
    const { repeat_password, ...newData } = await schema.validateAsync(data, {
      abortEarly: false,
    });
    return newData;
  } catch (error) {
    return error; 
  }
};

exports.signup = async (req, res) => {
  try {
    await validator(req.body);
    await User.create(req.body)
      .then((result) => {
        const { email, password } = result;
        // generate tokens
        const access_token = generateAccessToken(email, password);
        const refresh_token = generateRefreshToken(email, password);
        res.json({
          result,
          access_token,
          msg: "Registered Succesfully",
        });
      })
      .catch((err) => {
        const errors = [];
        if (err.code === 11000) {
          errors.push({ field: "email", msg: "email already exist" });
          res.status(422).json({ errors });
        }
      });
  } catch (error) {}
};

exports.signin = async (req, res) => {
  try {
    //   get user , verify email and password
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: `this user is not registered` });
    const correctPassword = await compareSync(password, user.password);
    if (!correctPassword)
      return res.status(401).json({ msg: `invalid password` });

    // generate tokens
    const access_token = generateAccessToken(user.email, user.password);
    const refresh_token = generateRefreshToken(user.email, user.password);
    res.json({
      user,
      access_token,
      msg: "Login Succesfully",
    });
  } catch (error) {}
};

exports.signout = (req, res) => {
  try {
    logout();
    res.json({
      msg: "Logout Succesfully",
    });
  } catch (error) {}
};

exports.me = async (req, res) => {
  try {
      const user =await User.findOne({email:req.user.email})
      const profile =await Profile.findOne({user_id:req.user._id})
     res.send(user,profile)
  } catch (error) {}
};

exports.token = (req, res) => {
  try {
    refreshToken(req.body.token);
    res.json({
      msg: "Token Refreshed Succesfully",
    });
  } catch (error) {}
};
 
