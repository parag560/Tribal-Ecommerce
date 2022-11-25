const router  = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//REGISTER
router.post("/register", async (req,res)=>{

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
        gender:req.body.gender,
        isSailer:req.body.isSailer
    });
    try{
    const savedUser = await newUser.save();
    const user = await User.findOne({email:req.body.email});
    const accessToken = jwt.sign({
        id:user._id,
        isSailer:user.isSailer
    },
    process.env.JWT_SEC,
    {expiresIn:"2h"}
    );
    
    //CREATECARTROW
    const newCart = new Cart({
        customerId:user._id,
        products:[]
    });
    const savedCart = await newCart.save();
    const cart = await Cart.findOne({customerId:user._id});

    const {password,...others} =user._doc;
    res.status(201).json({...others,accessToken,cart});
    }
    catch(err){
       res.status(500).json(err);
    }
})

/*router.get("/test",async(req,res)=>{
    res.json({"name":"Shrirang"});
});
*/

//LOGIN
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        
     if(user===null) {
        res.status(401).json("Wrong Credentials");
     } 
     else {
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

       if (Originalpassword !== req.body.password) {
        res.status(401).json("Wrong Credentials");
       } else {
        const accessToken = jwt.sign({
            id:user._id,
            isSailer:user.isSailer
        },
        process.env.JWT_SEC,
        {expiresIn:"2h"}
        
        );
        const {password,...others} =user._doc;
       
        const cart = await Cart.findOne({customerId:user._id.toString()});
        res.status(200).json({...others,accessToken,cart});
    }
     }
    } catch (err) {
        res.status(500).json(err);
    }

});

//CHECKEMAILISPRESENTORNOT
router.get("/findmail/:email",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.params.email});
        
        
     if(user===null) 
     {
        res.status(200).json("Not Present");
     } 
     else 
     {
        res.status(200).json("Present");
     }
    }  
    catch (err) {
        res.status(500).json(err);
    }

});





module.exports = router;

