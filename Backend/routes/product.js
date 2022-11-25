const router  = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndSailer } = require("./verifyToken");
const multer = require('multer');
const Rating = require("../models/Rating");
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
            cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,tit+".png");
    }
});
const upload =multer({storage:storage});
let tit="parag";
//CREATE
router.post("/registerproduct",upload.single('file'),verifyTokenAndSailer,async (req,res)=>{
    tit=req.body.title;
//console.log(req.file);
    const newProduct = new Product({
        title:req.body.title,
        desc:req.body.desc,
       sailerid:req.body.sailerid,
        img: "http://localhost:5000/uploads/"+req.body.title+".png",
        categories:req.body.categories,
        size:req.body.size,
        color:req.body.color,
        price:req.body.price,
       inStock:req.body.inStock
    });
tit=req.body.title;
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);        
    } catch (err) {
        res.status(500).json(err);
    }

});
router.post("/registerproduct1",upload.single('img'),verifyTokenAndSailer,async (req,res)=>{
    //console.log(req.file);
        //const newProduct = new Product({
           // title:req.body.title,
           // desc:req.body.desc,
           // sailerid:req.body.sailerid,
            //img: "uploads/"+req.body.title+".png",
           // categories:req.body.categories,
           // size:req.body.size,
           // color:req.body.color,
           // price:req.body.price,
           // inStock:req.body.inStock
       // });
    //
    res.status(200)
    });

//SearchProductByCategory
router.get("/productbycat/:cat",async (req,res)=>{
    try {
        const products = await Product.find({"categories":{$all:[req.params.cat]}});
        res.status(200).json(products);
    }
    catch{
        res.status(500).json(err);
    }
});

//SearchProductByID
router.get("/productbyid/:id",async (req,res)=>{
    try {
        const products = await Product.findOne({"_id":req.params.id});
        const avgrating = await Rating.aggregate([{$match:{"productid":req.params.id}},{$group:{"_id":null,"averagerating":{$avg:"$rating"}}}]);
        
        const {...others}=products._doc;
       
    
        res.status(200).json({...others,avgrating});
    }
    catch(err){
        res.status(500).json(err);
    }
});

//SearchProductBytitleforsailer
router.get("/productbytitle/:title",verifyTokenAndSailer,async (req,res)=>{
    try {
        const products = await Product.find({title:req.params.title});
        
        if (products.length === 0) {
            res.status(200).json("Not Present");    
        } else {
            res.status(200).json("Present");    
        }
        
    }
    catch{
        res.status(500).json(err);
    }
});
router.get("/productbysailor/:id",verifyTokenAndSailer,async(req,res)=>{
    try {
        const products=await Product.find({sailerid:req.params.id})
        if(products.length===0){
            res.status(200).json("No products registered");
        }
        else{
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete("/productdelete/:id",verifyTokenAndSailer,async(req,res)=>{
    try {
        const prod = await Product.findOne({_id:req.params.id})
        
        fs.unlinkSync('uploads/'+prod.title+'.png')
        const deletedproduct=await Product.deleteOne({_id:req.params.id})
        if(deletedproduct){
            
            res.status(200).json("Success");

        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;

