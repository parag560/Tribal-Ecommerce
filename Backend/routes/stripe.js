const router = require("express").Router();
const KEY="sk_test_51KvFdhSDCgOqT7WDIZ4pnWvOLEPr3KtjZty7BG31858hAIr7RkJwoZQRITJoe3GcmmGgpZ8ybNPs8twdnc5HHU9e00ilTFveoI";
const stripe = require("stripe")(KEY);

router.post("/payment",(req,res)=>{
    stripe.customers.create({
       
        source: req.body.tokenId,
        name: 'Shrirang Chopade',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '110092',
            city: 'New Delhi',
            state: 'Delhi',
            country: 'India',
        }
    })
    .then((customer) => {
 
        return stripe.PaymentIntent.create({
            amount: 5000,    // Charing Rs 25
            description: 'Web Development Product',
            currency: 'USD',
            customer: customer.id,
            confirm:true,
            payment_method_types: ['card'],
        });
    })
    .then((charge) => {
        res.send("Success") // If no error occurs
    })
    .catch((err) => {
        res.send(err)    // If some error occurs
    });
    /*stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"inr"
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr)
        {
            res.status(500).json(stripeErr)
        }
        else{
            res.status(200).json(stripeRes)
        }
    });*/

});

module.exports = router;