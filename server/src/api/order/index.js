import express, { Router } from "express"
import passport from "passport";
import { OrderModel } from "../../database/order";

const  router = express.Router();

/*
=>Route  : /
=>desc   : get all the restaurant details based on id
=>params : none
=>access : private
=>method : get
*/
router.get("/:_id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {user}=req.user;
        const getOrders = await OrderModel.findOne({user : user._id});
        if(!getOrders){
            return res.status(404).json({error:"order is not found for this user"})
        }
        return res.json({orders:getOrders})

    }catch(error){
        return res.status(500).json ({error: error.message})
    }

})
/*
=>Route  : /new
=>desc   : add new order 
=>params : none
=>access : private
=>method : put
*/
router.put("/new",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
      const {user} = req;
      const {orderDetails}=req.body;
      const addNewOrder = await OrderModel.findOneAndUpdate({
        user:user._id
      },{
        $push:{
        orderDetails: orderDetails}
      },{
        new:true,
      }
      )
      return res.json({order:addNewOrder})
    }catch(error){
        return res.status(500).json ({error: error.message})
    }

})

export default Router