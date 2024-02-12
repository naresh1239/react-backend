const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  title: String ,
  peregraph : String,
  author : String,
  userId : String,
  time : String,
  img : String
})

module.exports =  mongoose.model("products",productSchema);