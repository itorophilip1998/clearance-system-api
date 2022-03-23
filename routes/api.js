const express = require('express');
const { create_admin, get_asAdmin } = require("../controllers/AminController");  
const {
  signin,
  signup,
  signout,
  me,
  token,
  update_user,
} = require("../controllers/UserController");
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');
const route = express.Router() 


route // Auth Group
  .post("/signup", signup)
  .post("/signin", signin)
  .post("/update-user/:_id", update_user)
  .delete("/signout", authenticateToken, signout)
  .get("/me", authenticateToken, me)
  .post("/refresh-token", token)
  .get("/", (req, res) => res.send("Api"));

route // admin Group
  .get("/create-admin", create_admin)
  .get("/get-all", authenticateAdmin, get_asAdmin);
 
 
module.exports=route;

