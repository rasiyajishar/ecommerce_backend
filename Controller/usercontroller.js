
const productSchema=require("../Model/productsdb")
const Razorpay = require("razorpay");
const userSchema=require("../Model/usersdb")

const jwt=require("jsonwebtoken")
const { Model, Schema } = require("mongoose");
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

  const allProducts = async (req, res) => {
    try {
      const allProducts = await productSchema.find();
      res.json(allProducts);
    } catch (err) {
      res.json("error");
    }
  };
  



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



// const categorydata= async (req, res) => {
//   const category = req.params.categoryname
//   const products = await productSchema.find({ category })
//   res.status(200).json({
//       status: 'success',
//       message: 'Successfully fetched products details.',
//       data: products
//   })
// },



const categorydata = async (req, res) => {
  const categoryList = req.params.category;
  console.log(categoryList);
  try {
  
    if (categoryList == "nike") {
      const findproduct = await productSchema.find({ category: { $in: "nike" } });
      return res.json(findproduct);
    }else {
      res.status(404).json("not found the category");
    }
  } catch (error) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};


// const categorydatas = async(req,res)=>{
//   const categorytype=req.params.category;
//   console.log(categorytype);
//   try{
//     if(categorytype=="men"){
//       const findproduct = await productSchema.find({category:{$in:"men"}});
//       return res.json(findproduct)
//     }else{
//       res.status(404).json("not found the category")
//     }
//   }catch(error){
//   res.status(500).json("server error")
// }

// }

const addTocart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productSchema.findById(productId);
    console.log(product);
    if (!product) {
      return res.json({ message: "product not found" });
    }

    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");
    console.log(verified);
    const user = await userSchema.findOne({ email: verified.email });

    // Add the product to the user's cart
    user.cart.push(product);
    await user.save();

    res.json({ message: "Product added to the cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");
    console.log(verified);

    const user = await userSchema.findOne({ email: verified.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = user.cart;

    res.status(200).json({ message: "Your cart products", cart: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error: error.message });
  }
};

const removeCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const token = req.cookies.token;
    const verified = jwt.verify(token, "secret-key");

    const user = await userSchema.findOne({ email: verified.email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const index = user.cart.indexOf(productId);
    if (index == 1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    user.cart.splice(index, 1);
    await user.save();
    res.status(200).json({ message: "Product removed from your cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};











  //addtowishlist
  const addToWishlist = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productSchema.findById(productId);
      console.log(product);
      if (!product) {
        return res.json({ message: "Product not found" });
      }
  
      const token = req.cookies.token;
      const decoded = jwt.verify(token, "secret-key");
      
      user.wishlist.push(product);
      await user.save();
  
      res.json({ message: "Product added to the wish list" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //getwishlist

  const getWishlist = async (req, res) => {
    try {
      const token = req.cookies.token;
      const verified = jwt.verify(token, "secret-key");
  
      const user = await userSchema.findOne({ email: verified.email });
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      const wishlistItems = user.wishlist;
      res
        .status(200)
        .json({ message: "your wishlist items", wishlist: wishlistItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error", error: error.message });
    }
  };
  
  //remove wishlist
  const removeWishlist = async (req, res) => {
    try {
      const productId = req.params.id;
      const token = req.cookies.token;
      const verified = jwt.verify(token, "secret-key");
  
      const user = await userSchema.findOne({ email: verified.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const index = user.wishlist.indexOf(productId);
      if (index == 1) {
        return res.status(404).json({ message: "Product not found in wishlist" });
      }
  
      user.wishlist.splice(index, 1);
      await user.save();
  
      res.status(200).json({ message: "Product removed from your wishlist" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error", message: error.message });
    }
  };


  const orderProducts = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productSchema.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
      const token = req.cookies.token;
      const verified = jwt.verify(token, "secret-key");
      const user = await userSchema.findOne({ email: verified.email });
  
      const orderDate = new Date();
      const { price } = product;
  
      if (price !== req.body.price) {
        return res
          .status(400)
          .json({ message: "THe entered price does not mach the product price" });
      }
  
      const instance = new Razorpay({
        key_id: "rzp_test_lcdp3oIEzg2qkR",
        key_secret: "elHVCagf8LjkX7AEhQL194tM",
      });
  
      const order = await instance.orders.create({
        amount: price * 100,
        currency: "INR",
        receipt: "Receipt",
      });
  
      user.orders.push({
        product: productId,
        orderId: order.id,
        payment: price,
        orderDate,
      });
      await user.save();
      res.status(200).json({ message: "payment successfull....order comfirmed" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  };

  

module.exports={register,
    userLogin,
    allProducts,
    specificproduct,
    categorydata,
    addTocart,
    getCart,
    removeCart,
    addToWishlist,
    getWishlist,
    removeWishlist,
    orderProducts
  }