const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();
const { TOKEN_SECRET, TOKEN_REFRESH_SECRET } = process.env;

exports.generateAccessToken = (user) => {
  const access_token = jwt.sign({ user }, TOKEN_SECRET, { expiresIn: "10m" });
  return access_token;
};

exports.generateRefreshToken = async (user) => {
  try {
    const refresh_token = jwt.sign({ user }, TOKEN_REFRESH_SECRET);
    await User.updateOne({ refresh_token });
    return refresh_token;
  } catch (error) {}
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    try {
      req.user = await User.findOne({ email: user.user }); 
    } catch (error) {}
    next();
  });
};

exports.authenticateAdmin= (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    try {
      req.user = await User.findOne({ email: user.user }); 
    } catch (error) { }
    console.log(req.user.role);

    if (req.user.role != "admin") return res.sendStatus(403);
    next();
  });
};

exports.logout = async () => {
  try {
    await User.updateOne({ refresh_token: null });
  } catch (error) {}
};

exports.refreshToken = async (token) => {
  try {
      const userToken=await User.findOne({token})
    if (token == null) return res.sendStatus(401);
    if (!userToken) return res.sendStatus(403);
     jwt.verify(token, TOKEN_SECRET, async (err, user) => {
       if (err) return res.sendStatus(403);
        const access_token = generateAccessToken({ user : user.name});
       return access_token;
     });
     
  } catch (error) {}
};

