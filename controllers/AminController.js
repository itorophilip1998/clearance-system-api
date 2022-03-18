const Offices = require("../model/Offices");

 
const user = {
    email: "admin@admin.com",
    password: "admin",
    role: "admin",
};
const office = {
    department: 5000,
    faculty: 2000,
    student_affair: 3000,
    library: 4000,
    health_services: 2500,
    busary: 4000,
    accademic_affair: 2000,
    registrar: 2000
};
exports.create_admin = async (req, res) => {
  try {
    const user = await User.create(user);
    const offices = await Offices.create(office);
    res.json({ user, offices });
  } catch (error) {}
};

exports.get_asAdmin = async (req, res) => {
  try {
     
  } catch (error) {}
};

 