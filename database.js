const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()


const check = async()=>{

  try {
 const data =  await  mongoose.connect(process.env.DATABASE)
    console.log("connect with mongodb boss")
  } catch (error) {
      // console.log(error)
  }
}
check()