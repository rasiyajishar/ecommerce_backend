const userSchema=require("../Model/usersdb")
const productSchema=require("../Model/productsdb")

const jwt=require("jsonwebtoken")
const { model, Schema } = require("mongoose");
//register
const register = async(req,res)=>{
    console.log(req.body);
    await userSchema.insertMany({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    res.json("user registered")
}




//login

const userLogin = async (req, res) => {
    try {
      const login = await userSchema.findOne({ email: req.body.email });
  
      if (login && login.email === req.body.email && login.password === req.body.password) {
        const token = jwt.sign({ email: login.email }, "secret-key");
        res.cookie("token", token);
        res.json({ message: "User logged in successfully" });
        return;
      }
  
      res.status(401).json({ error: "Wrong password or email" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

//allproducts
const allProducts=async(req,res)=>{
    try{
        const allProducts=await productSchema.find()
        res.json(allProducts)
    }
    catch(error){
        res.json("error")
    }
}



// specific products

const specificproduct=async(req,res)=>{
try{
  const productid=await productSchema.findById(req.params.id)
  if(!productid){
    res.json({message:"product not found"})
  }
  res.json(productid)
}catch(error){
  res.json({message:"server error"})
}
}





  
module.exports={register,
    userLogin,
    allProducts,
    specificproduct}