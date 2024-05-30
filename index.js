const express=require("express");
const app=express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/ProductDb";
const Product=require("./models/db.js");


app.use(express.json());

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


app.get("/home",(req,res)=>{
    res.send("Home page");
})
//GET ALL USERS
app.get('/allproducts', async (req, res) => {
  try {
      let allproduct = await Product.find()
      res.send({
          "Msg": "List of all products",
          "Data": allproduct
      })
  } catch (error) {
      res.send({
          "msg": "error",
          "errror": error.message
      })
  }
})


  
//ADD USER
app.post("/addproduct",async (req,res)=>{
  const newproduct = new Product(req.body);
  try {
    await newproduct.save();
    res.send("Data saved successfully")
    
  } catch (error) {
    res.send(error);
   }
})

//Update Route
app.patch("/updateproduct/:id",async(req,res)=>{
  const id = req.params.id;
  const {name,description,price,category,quantity}=req.body;
  try {
    await User.findByIdAndUpdate(id, {name,description,price,category,quantity},{new:true});
    res.send("Data updated successfully")
    
  } catch (error) {
    res.send(error);
  }
  
});

//delete route
app.delete("/deleteproduct/:id",async (req,res)=>{
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.send("Data deleted successfully")
    
  } catch (error) {
    res.send(error)
    
  }
})

app.listen(8080,()=>{
    console.log("server is listening at 8080");
})