import  express, { Router } from "express"
import { MenuModel } from "../../database/menu";

const router = express.Router();
/*
=>Route  : /list/:_id
=>desc   : get list of menu based on resturant id 
=>params : id
=>access : public
=>method : get
*/
router.get("/list/:_id",async(req,res)=>{
    try{
        const {_id }=req.params
        const menus =await MenuModel.findById(_id);
        if(!menus){
            return res.status(404).json({error:"no menu present for this resturant"})
        }
        return res.json({menus});
    }catch(error){
        return res.status(500).json ({error: error.message})
    }
})

export default Router