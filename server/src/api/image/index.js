import express from "express"
import AWS from "aws-sdk"
import multer from "multer"

import { ImageModel } from "../../database/allModels"

import {s3Upload} from "../../utils/s3"
const Router = express.Router();
//configure multer
const storage = multer.memoryStorage();
const upload = multer({storage}); //dynamic one


/*
=>Route  : /:_id
=>desc   : get image based on their id
=>params : _id
=>access : public
=>method : get
*/
Router.get("/:_id",async(req,res)=>{
try {
const image =await ImageModel.findById(req.params)
return res.json({image})
}catch(error){
    return res.status(500).json({error:error.message})
}
})

/*
=>Route  : /
=>desc   : upload given  image to s3 n db
=>params : _id
=>access : public
=>method : post
*/
Router.post("/",upload.single("file"),async(req,res)=>{
    try {
        const file =req.file 
        const bucketOptions ={
            Bucket:"Zomato-Clone",
            Key:file.originalname,
            Body:file.buffer,
            ContentType:file.mimetype,
            ACL:"public-read"      //access control list
        }
        const uploadImage = await s3Upload(bucketOptions);
        //uploading image in db
        const dbUpload = await ImageModel.create({
            images:[{Location: uploadImage.Location},]
        })
        return res.status(200).json({dbUpload})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
    })


export default Router;