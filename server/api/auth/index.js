import express, { Router } from "express"
import { UserModel } from "../../database/allModels"
const router =express.Router();

router.post("/singup",async(req,res)=>{
    try{
        await UserModel.findByEmailAndPhone(req.body.credentials)
        const newUser= await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token,status: "success"})
    }catch(error){
        return res.status(500).json({status:"failed",error: error.message})
    }
})
router.post("/singin",async(req,res)=>{
    try{
        const user=await UserModel.findByEmailAndPassword(req.body.credentials)
        const token =user.generateJwtToken();
        return res.status(200).json({token, status:"success"})
    }catch(error){
        return res.status(500).json({status:"failed",error: error.message})
    }

})

export default Router;