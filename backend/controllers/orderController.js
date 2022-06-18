const Order=require("../models/orderModel");
const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//for new orders

exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;//size
    const order= await Order.create({
        shippingInfo,
        // size,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });
    
    res.status(201).json({
        success:true,
        order,
    });

});

//for single order details
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{


    const order=await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this is Id",404));
    }

    res.status(200).json({
        success:true,
        order
    })
})


//get logged user orders
exports.myOrders=catchAsyncErrors(async(req,res,next)=>{

    const orders=await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders
    })
})

//get all orders--admin
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{

    const orders=await Order.find();
    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })


    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

//update order status--admin
exports.updateOrder=catchAsyncErrors(async(req,res,next)=>{

    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("Product Delivered",404));
    }

    order.orderItems.forEach(async (or)=>{
        await updateStock(or.product,or.quantity)
    });
    order.orderStatus=req.body.status;
    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product=await Product.findById(id);
    // if(!product){
    //     return next(new ErrorHandler("not found"))
    // }
    // console.log(product,id,quantity);

    product.stock-=quantity;
    await product.save({validateBeforeSave:false})
}

//delete order--admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{

    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }

    await order.remove()

    res.status(200).json({
        success:true,
    })
})