import express from "express"
import passport from "passport"
import { UserModel } from "../../database/allModels"
import { validateSignin, validateSignup } from "../../validation/auth.validation";
const Router =express.Router();

Router.post("/singup",async(req,res)=>{
    try{
        await validateSignup(req.body.credentials);
        await UserModel.findByEmailAndPhone(req.body.credentials)
        const newUser= await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token,status: "success"})
    }catch(error){
        return res.status(500).json({status:"failed",error: error.message})
    }
})
Router.post("/singin",async(req,res)=>{
    try{
        await validateSignin(req.body.credentials);
        const user=await UserModel.findByEmailAndPassword(req.body.credentials)
        const token =user.generateJwtToken();
        return res.status(200).json({token, status:"success"})
    }catch(error){
        return res.status(500).json({status:"failed",error: error.message})
    }

})
//google auth here
Router.get("/google",passport.authenticate("google",{
    scope:[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
}))
Router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/"}),
(req,res)=>{
    return res.status(200).json({token:req.session.passport.user.token,})
}
)

export default Router;