const mongoose=require("mongoose")
const { stringify } = require("querystring")
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Price"],
        maxLength:[10,"Price Cannot exceed 8 digits"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"please enter category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 digits"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Product",productSchema);