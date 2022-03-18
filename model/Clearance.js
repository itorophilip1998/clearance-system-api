;const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user_id: String,
    status: Boolean 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clearance", Schema);
