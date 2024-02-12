const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const cors = require("cors")
   require("./database")
const User = require("./Shema")
const Product = require("./productShema")
const port = process.env.PORT || "8000"
app.use(express.json())
app.use(cors())

app.post("/register", async(req,res)=>{
 
    let find = await User.findOne({email : req.body.email})
  if(find){
      console.log("not")
      res.send({})
  }else{
    let user = new User(req.body)
    let data = await user.save()
  data  = data.toObject();
delete  data.password
delete data.email
res.send(data)
}
})

app.post("/login", async(req,res)=>{

     let user = await User.findOne(req.body).select("-password").select("-email")

      if(user){
          res.send(user)
      }else{
        res.send({})
          console.log("no found")
      }

})

app.post("/add-products", async(req,res)=>{
    let product = new Product(req.body)
    let data = await product.save()
    res.send(data)
})
app.get("/user/:id", async(req,res)=>{
    let products = await Product.find({userId : req.params.id})
   if(products.length>0){
    res.send(products)

   }else{
    res.send({result : "no products found"})
   }

})

app.delete("/delete/:id", async(req,res)=>{
    let products = await Product.deleteOne({_id : req.params.id})
    res.send(products)
})
app.get("/product/:id", async(req,res)=>{
    let products = await Product.findOne({_id : req.params.id})
 
    if(products){
        res.send(products)
    }else{
        res.send({products : "not found"})
    }
})
app.get("/one/:id", async(req,res)=>{
    let products = await Product.findOne({_id : req.params.id})
    if(products){
        res.send(products)
    }else{
        res.send({products : "not found"})
    }
})
app.get("/user", async(req,res)=>{
    let products = await Product.find()
 
    if(products){
        res.send(products)
    }else{
        res.send({products : "not found"})
    }
})
app.put("/product/:id", async(req,res)=>{
    let products = await Product.updateOne(
        {
        _id: req.params.id
        },
        {
            $set : req.body        }
    )
    res.send(products)
})
app.get("/search/:key",async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {author :{$regex:req.params.key}},
            {title :{$regex:req.params.key}}
        ]
    })
    res.send(result)
})
app.listen(port, () => {
    console.log(`Listen on the port 3000...${port}`);
});