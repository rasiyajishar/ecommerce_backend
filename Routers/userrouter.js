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
app.get("/products/:id", verifyToken,usercontroller.specificproducts);

module.exports=app;