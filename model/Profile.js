const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user_id:String,
    name:String,
    session:String,
    department:String,
    faculty:String
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model("Profile", Schema);
