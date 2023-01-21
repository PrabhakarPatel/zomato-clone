import mongoose from "mongoose";
const FoodSchema =new mongoose.Schema({
   name : {type:String,reqired:true},
   descript:{type:String,required:true},
   isVeg:{type:String,required:true},
   isContainsEggs:{type:Boolean,required:true},
   category:{type:String,required:true},
   photos:{
    type:mongoose.Types.ObjectId,
    ref:"images",
   },
   price:{type:Number,default:150,required:true},
   addOns:[{
    type:mongoose.Types.ObjectId,
    ref:"foods"
   }
],
resturant:{
    type:mongoose.Types.ObjectId,
    ref:"resturants",
    required:true
   }

}
,{
    timestamps:true
})
export const FoodModel = mongoose.model("food",FoodSchema)