const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"max Name length 30"]
    },
    email:{
        type:String,
        required:[true,"Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    password:{
        type:String,
        required:[true,"Enter your password"],
        minlength:[8,"Password must be of minimum 8 characters"],
        select:false
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:String,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password=await bcrypt.hash(this.password,10);
})

//JWT Token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//compare password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//generating password reset token
userSchema.methods.getResetPasswordToken=function(){
    //generating token
    const resetToken=crypto.randomBytes(20).toString("hex");

    //hashing and adding two user schema
    this.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}

module.exports=mongoose.model("User",userSchema);