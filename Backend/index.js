const express  = require("express");
const  app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const stripeRoutes = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DBConnection Successfull!"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json())
app.use('/uploads',express.static('uploads'));
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",stripeRoutes);


app.listen(process.env.PORT || 5000,() => {
    console.log("Backend Server is runnning")
})