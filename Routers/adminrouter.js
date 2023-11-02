const express=require("express")
const app=express()
const bodyparser = require("body-parser");

const usercontroller=require('../Controller/usercontroller')

const admincontroller=require('../Controller/admincontroller')
const adminVerifyToken = require("../Middleware/adminmiddleware")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.post("/login",admincontroller.login)

app.get("/users", adminVerifyToken, admincontroller.allUsers);
app.get("/users/:id", admincontroller.specificUsers);
app.post("/products", admincontroller.createProducts);
app.put("/productsupdate/:id", admincontroller.updateProduct);
app.get("/products/:id", admincontroller.specificProducts);
app.delete("/product/:id", admincontroller.deleteProduct);
app.get("/products/category/:category", admincontroller.categoryData);
app.get("/products", adminVerifyToken, admincontroller.allProducts);
 app.get("/products", adminVerifyToken, admincontroller.getallProducts);

module.exports=app;