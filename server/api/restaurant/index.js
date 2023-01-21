import  express, { Router }  from "express";
import { RestaurantModel } from "../../database/allModels";
import {  validateId, validateSearchString } from "../../validation/common.validation";

const router = express.Router();

/*
=>Route  : /
=>desc   : get all the restaurant details based on city
=>params : none
=>access : public
=>method : get
*/
router.get("/",async(req,res)=>{
    try{
        const {city} = req.query;
        const restaurants= await RestaurantModel.find({city})
        if (restaurants.length===0){
            return res.json({error:"no resturant food in this city"})
        }
        return res.json({restaurants})
    }catch(error){
        return res.status(500).json ({error: error.message})
    }
})

/*
=>Route  : /:_id
=>desc   : get all the restaurant details based on id
=>params : id
=>access : public
=>method : get
*/
router.get("/:_id",async(req,res)=>{
    try{
        const {_id}=req.params;
        
        await validateId(req.params);
        const restaurant = await RestaurantModel.findById(_id);
        if(!restaurant){
            return res.status(400).json({error:"resturant not found"});
        }
        return res.json({restaurant})
    }catch(error){
        return res.status(500).json ({error: error.message})
    }
})
/*
=>Route  : /search/:searchString
=>desc   : get restaurant details based on search string
=>params : id
=>access : public
=>method : get
*/
router.get("/search/:searching",async(req,res)=>{
    try{
      const {searchString}=req.params
      await validateSearchString(req.params)
      const restaurants= await RestaurantModel.find({
        name:{$regex:searchString,$option:"i"}
      })
      if(!restaurants.length===0){
        return res.status(404).json({error:`no restaurant not found`})
      }
      return res.json({restaurants})
    }catch(error){
        return res.status(500).json ({error: error.message})
    }
})
export default Router ;