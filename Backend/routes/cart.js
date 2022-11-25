const Cart = require("../models/Cart");
const User = require("../models/User");
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router  = require("express").Router();

//updatecartproductbtinsertingproduct
router.put("/insertproducttocart", async(req,res)=>{
    
    try{
          
const updatedCart = await Cart.findByIdAndUpdate(req.body.id,{
    $push:{products:req.body.productobj}
},{new:true});
        console.log(req.body.productobj);
        
res.status(200).json(updatedCart);

    }
    catch(err){
        res.status(500).json(err);
    }
    
});

router.put("/deleteproductfromcartbyproductid/:id/:pid", async(req,res)=>{
   console.log("contact");
    try{
        
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $pull:{"products":{"productId":req.params.pid}}
        });  
        const cart = await Cart.findOne({customerId:updatedCart.customerId.toString()});     
res.status(200).json(cart);

    }
    catch(err){
        res.status(500).json(err);
    }
    
});

router.post("/placeorder/:cid/:amt", async(req,res)=>{
   
    try{
        
        const cart = await Cart.findOne({customerId:req.params.cid});
        const newOrder = new Order({
            customerId:cart._doc.customerId,
            products:cart._doc.products,
            amount:req.params.amt
        });
        const savedOrder = await newOrder.save();
        const deletecart = await Cart.update({"customerId":req.params.cid},{
            $set:{"products":[]}
        });
        res.status(200).json(savedOrder);
        

    }
    catch(err){
        res.status(500).json(err);
    }
    
});

router.get("/getorder/:cid/", async(req,res)=>{
   
    try{
        
        const orders = await Order.find({customerId:req.params.cid});
        
        res.status(200).json(orders);
        

    }
    catch(err){
        res.status(500).json(err);
    }
    
});



    






module.exports = router;