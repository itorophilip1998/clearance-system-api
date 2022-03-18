const express = require('express');
const { creat_admin } = require('../controllers/AminController');
const {
  signin,
  signup,
  signout,
  me,
  token,
} = require("../controllers/UserController");
const { authenticateToken } = require('../middleware/auth');
const route = express.Router() 


route // Auth Group
  .post("/signup", signup)
  .post("/signin", signin)
  .delete("/signout", authenticateToken, signout)
  .get("/me", authenticateToken, me)
  .post("/refresh-token", token)
  .get("/", (req, res) => res.send("Api"));

route // admin Group
  .get("/admin", creat_admin)
module.exports=route;

