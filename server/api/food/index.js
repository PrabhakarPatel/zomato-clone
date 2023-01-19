import  express, { Router }  from "express";
import { FoodModel } from "../../database/allModels";

const router = express.Router();

/*
=>Route  : /:_id
=>desc   : get food based on iD
=>params : _id
=>access : public
=>method : get
*/
router.get("/:id",async(req,res)=>{
    try{
        const {_id}=req.params;
        const foods =FoodModel.findById(_id);
        return res.json({foods})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
})

/*
=>Route  : /r/:_id
=>desc   : get all food based on particular restaurant
=>params : _id
=>access : public
=>method : get
*/
router.get("/r/:id",async(req,res)=>{
    try{
        const {_id}=req.params;
        const foods = await FoodModel.find({
            resturant:_id,
        })
        return res.json({foods})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
})
/*
=>Route  : /c/:category
=>desc   : get all food based on particular category
=>params : _id
=>access : public
=>method : get
*/
router.get("/c/:category",async(req,res)=>{
    try{
        const {category}=req.params;
        const foods = await FoodModel.find({
            category:{$regex: category, $option:"i"},
        })
        if(!foods){
            return res.status(404).json({error: `no food matched with ${category}`})
        }
        return res.json({foods})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
})

export default Router;