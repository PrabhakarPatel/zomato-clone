import  express from "express"
import { ImageModel } from "../../database/image";
import { MenuModel } from "../../database/menu";
import { validateId } from "../../validation/common.validation";
const Router = express.Router();
/*
=>Route  : /list/:_id
=>desc   : get list of menu based on resturant id 
=>params : id
=>access : public
=>method : get
*/
Router.get("/list/:_id",async(req,res)=>{
    try{
        const {_id }=req.params
        await validateId(req.params);
        const menus =await MenuModel.findById(_id);
        if(!menus){
            return res.status(404).json({error:"no menu present for this resturant"})
        }
        return res.json({menus});
    }catch(error){
        return res.status(500).json ({error: error.message})
    }
})
/*
=>Route  : /image/:_id
=>desc   : get all menu images with their resturant ids
=>params : id
=>access : public
=>method : get
*/
Router.get("/image/:_id",async(req,res)=>{
    try{
        const {_id }=req.params
        const menuImages =await ImageModel.findById(_id);
        if(!menuImages){
            return res.status(404).json({error: "no menu images found here"})
        }
        return res.json({menuImages})
    }catch(error){
        return res.status(500).json ({error: error.message})
    }
})

export default Router