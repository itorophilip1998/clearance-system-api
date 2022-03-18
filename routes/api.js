const express = require('express');
const { create_admin, get_asAdmin } = require("../controllers/AminController");
const { create_clearance } = require('../controllers/ClearanceController');
const { create_profile } = require('../controllers/ProfileController');
const {
  signin,
  signup,
  signout,
  me,
  token,
} = require("../controllers/UserController");
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');
const route = express.Router() 


route // Auth Group
  .post("/signup", signup)
  .post("/signin", signin)
  .delete("/signout", authenticateToken, signout)
  .get("/me", authenticateToken, me)
  .post("/refresh-token", token)
  .get("/", (req, res) => res.send("Api"));

route // admin Group
  .get("/create-admin", create_admin)
  .get("/get-all",authenticateAdmin, get_asAdmin);

route // Profile Group
  .post("/create-profile",authenticateToken, create_profile);

route // clearance Group
  .post("/create-clearance",authenticateToken, create_clearance);
module.exports=route;

