const mongoose= require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Must Have A Name"]
    },
    price:{
        type:Number,
        required:[true,"Prodcuct Must Have Some Price!"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is Not Valid!'
        }
    }
})

module.exports=mongoose.model('Product',productSchema)