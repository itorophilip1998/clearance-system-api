const mongoose = require('mongoose');
require('dotenv').config();
const {DB_URI}=process.env; 

const DB= async ()=>{
    await mongoose.connect(DB_URI).then((result) => {
        console.log("Database Connected")
    }).catch((err) => {
        console.log("Error On connection")
    });
}

module.exports=DB;

