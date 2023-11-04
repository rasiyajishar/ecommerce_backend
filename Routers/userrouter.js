const express=require("express")
const app=express()
const bodyParser = require("body-parser");
const usercontroller=require("../Controller/usercontroller")

const verifyToken = require("../Middleware/usermiddleware")

app.use(bodyParser.json());

app.post("/register",usercontroller.register);
app.post("/login",usercontroller.userLogin);
// app.post("/products",verifyToken,usercontroller.allProducts)
app.get("/products",verifyToken,usercontroller.allProducts);
app.get("/products/:id", verifyToken,usercontroller.specificproduct);
app.get("/products/category/:category",verifyToken,usercontroller.categorydata)
app.post("/products/cart/:id", verifyToken, usercontroller.addTocart);
app.get("/cart", verifyToken, usercontroller.getCart);
app.delete("/products/cart/:id", verifyToken, usercontroller.removeCart);
app.post("/products/wishlist/:id", verifyToken, usercontroller.addToWishlist);
app.get("/wishlist", verifyToken, usercontroller.getWishlist);
app.delete("/products/wishlist/:id",verifyToken,usercontroller.removeWishlist);
app.post("/order/:id", verifyToken, usercontroller.orderProducts);

module.exports=app;