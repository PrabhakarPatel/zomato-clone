import  express  from "express";
import dotenv from "dotenv"
import passport from "passport"
import PrivateRouteConfig from "./config/route.config"
import session from "express-session"
//database connection

import connectDB from "./database/connection";
import Auth from "./api/auth"
import Food from "./api/food"
import User from "./api/user"
import Menu from "./api/menu"
import Restaurant from "./api/restaurant"
import Order from "./api/order"
import Review from "./api/review"


dotenv.config();


const zomato =express();
PrivateRouteConfig(passport);

zomato.use(express.json());
zomato.use(session({secret:"ZomatoApp"}))
zomato.use(passport.initialize());
zomato.use(passport.session())
const PORT = 4000;
zomato.get("/",(req,res)=>{
    res.json({
        message:"server is running"
    })
})

zomato.use("/auth",Auth);
zomato.use("/food",Food);
zomato.use("/restaurant",Restaurant);
zomato.use("/user",User);
zomato.use("/menu",Menu);
zomato.use("/order",Order);
zomato.use("/review",Review);

//  /auth /singup
zomato.listen(PORT,()=>{
    connectDB()
   .then(()=>{
    console.log("server is running!!")
   })
   .catch((error)=>{
        console.log("server is running ,but the database connection failed");
        console.log(error);
       })
        // console.log("server is running")
})