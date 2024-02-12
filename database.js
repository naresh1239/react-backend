const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()


const check = async()=>{

  try {
 const data =  await  mongoose.connect("mongodb+srv://naresh:kumawat123@cluster0.krwcn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    console.log("connect with mongodb boss")
  } catch (error) {
      // console.log(error)
  }
}
check()