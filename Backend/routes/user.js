const Rating = require("../models/Rating");
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router  = require("express").Router();

//UPDATEfORGETpASSWORD
router.put("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();

    }
    try{
const updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true});
res.status(200).json(updatedUser);

    }
    catch(err){
        res.status(500).json(err);
    }
    
});

//POST Rating
router.post("/registerrating",async (req,res)=>{
   
        const newRating = new Rating({
            userid: req.body.userid,
            productid:req.body.productid,
            rating:req.body.rating 
        });
    
        try {
            const savedRating = await newRating.save();
            res.status(200).json(savedRating);        
        } catch (err) {
            res.status(500).json(err);
        }
    
    });

//update rating
router.put("/updaterating/:id/:rating",async (req,res)=>{
   
    try {
        const updatedRating = await Rating.update({"_id":req.params.id},{
            $set:{"rating":req.params.rating}
        });
    
        
        res.status(200).json(updatedRating);        
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getrating/:cid/:pid",async(req,res)=>{
    try {

        const prodrating = await Rating.findOne({"userid":req.params.cid,"productid":req.params.pid});
        
        if(prodrating)
        {
            res.status(200).json(prodrating._doc.rating);
        }
        else{
            res.status(200).json(0);
        }
    } 
    catch (err) {
        res.status(500).json(err);
    }
});


    






module.exports = router;