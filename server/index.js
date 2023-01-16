import  express  from "express";
import dotenv from "dotenv"
//database connection
import connectDB from "./database/connection";

dotenv.config();


const zomato =express();
zomato.use(express.json());
const PORT = 4000;
zomato.get("/",(req,res)=>{
    res.json({
        message:"server is running"
    })
})
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