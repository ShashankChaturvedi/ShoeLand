const mongoose=require("mongoose");


const connectDatabase=()=>{
    // console.log(process.env.DB_URI);
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((data)=>{
        console.log(`Mongo connected with server:${data.connection.host}`);
    });
}

module.exports=connectDatabase;