import express, { Router } from "express"
import { ReviewModel } from "../../database/allModels";
import passport from "passport";
const  router = express.Router();

/*
=>Route  : /:resId
=>desc   : get all Review for a particular restaurant id 
=>params : resId
=>access : public
=>method : get
*/
router.get("/:resId",async(req,res)=>{
    try{
    const {resId}= req.params
    const reviews = await ReviewModel.find({restaurants:resId}).sort({createdAt: -1})
    return res.json({reviews})


    }catch(error){
        return res.status(500).json ({error: error.message})
    }

})
/*
=>Route  : /new
=>desc   : add new food /restaurant  review and rating 
=>params : none
=>access : public
=>method : post
*/
router.post("/new",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
    const {_id}=req.user;
    const {reviewData}=req.body;
    const newReview =await ReviewModel.create({...reviewData,user:_id});
    return res.json({newReview})

    }catch(error){
        return res.status(500).json ({error: error.message})
    }

})
/*
=>Route  : /delete
=>desc   :  delete food /restaurant  review and rating 
=>params : none
=>access : private
=>method : post
*/
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
    const {user}=req;
    const {id}=req.params;
    const data = await ReviewModel.findOneAndDelete({_id:id,user: user._id})
    if(!data){
        return res.status(404).json({message:"review was not deleted"})
    }
    return res.json({message:"successfully deleted a review",data})
    }catch(error){
        return res.status(500).json ({error: error.message})
    }

})

export default Router