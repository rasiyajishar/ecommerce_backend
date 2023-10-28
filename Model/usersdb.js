const mongoose=require("mongoose")
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:[{
        type:String,
        required:false

    }],
    wishlist:[{
        type:String,
        
    }],


    orders:[{


    product:{
        type:String
    },


    payment:{
        type:Number

    },
    orderdetails:{
        type:Date,
        default:Date.now

    }

    }]

})

module.exports=mongoose.model('usercollection',userSchema)