import express, { Router } from "express"
import { UserModel } from "../../database/allModels"
import passport from "passport";

const  router = express.Router();


/*
=>Route  : /
=>desc   : get all the restaurant details based on id
=>params : id
=>access : private
=>method : get
*/

router.get("/",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {email,fullName,phoneNumber,address}= req.user
        return res.json({user :{email,fullName,phoneNumber,address}});
    }catch(error){
        return res.status(500).json ({error: error.message})
    }

})

/*
=>Route  : /:id
=>desc   : get user data 
=>params : id
=>access : public
=>method : get
*/
 router.get("/:_id",async(req,res)=>{
    try{
        const {_id}=req.params;
        const getUser =await UserModel.findById(_id)
        const {fullName}=getUser;
        if(!getUser){
            return res.status(404).json({error:"user not found by the id"})
        }
        return res.json({user: {fullName}})
    }catch(error){
        return res.status(500).json ({error: error.message})
    }
 })


export default Router