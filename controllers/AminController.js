const User = require("../model/User");

 const admin = {
   email: "admin@admin.com",
   password: "admin",
   role: "admin"
 };
 
exports.create_admin = async (req, res) => { 
 
  try {
    const user = await User.create(admin);  
    res.send( user );
  } catch (error) {}
};

exports.get_asAdmin = async (req, res) => {
    try {
      const users = await User.find({ role: "user" });
      const clearance=await User.find({role:"user"})
      const cleared = await User.find({ status: true, role: "user" });
        const not_cleared = await User.find({ status: false, role: "user" });
        res.json({users,clearance,cleared,not_cleared})
  } catch (error) {}
};
