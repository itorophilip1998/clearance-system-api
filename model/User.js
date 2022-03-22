const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose'); 

const Schema = new mongoose.Schema(
  {
    email: {
      type: String, 
    },
    password: String,
    refresh_token: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    session: {
      type: String,
      default: null,
    },
    _department: {
      type: String,
      default: null,
    },
    _faculty: {
      type: String,
      default: null,
    }, 
    department: {
      type: Boolean,
      default: null,
    },
    faculty: {
      type: Boolean,
      default: null,
    },
    student_affair: {
      type: Boolean,
      default: null,
    },
    library: {
      type: Boolean,
      default: null,
    },
    health_services: {
      type: Boolean,
      default: null,
    },
    busary: {
      type: Boolean,
      default: null,
    },
    accademic_affair: {
      type: Boolean,
      default: null,
    },
    registrar: {
      type: Boolean,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
      },
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);



 
Schema.pre('save',  function(next) {
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  this.password=hash; 
  next();
})

module.exports=mongoose.model("User",Schema);