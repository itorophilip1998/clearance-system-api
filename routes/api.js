const express = require('express');
const { create_admin } = require("../controllers/AminController");
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
  .get("/create-admin", create_admin);
module.exports=route;

