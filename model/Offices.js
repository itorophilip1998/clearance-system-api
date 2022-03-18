const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    department: Number, 
    faculty: Number, 
    student_affair: Number, 
    library: Number, 
    health_services: Number, 
    busary: Number, 
    accademic_affair: Number, 
    registrar: Number
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offices", Schema);
