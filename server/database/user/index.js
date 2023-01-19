import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    address:[
        {
            detail:{type:String},for:{type:String}
        }
    ],
    phoneNumber:[{type:Number}],
  },
  { 
    timestamps: true,
  }
);
//attachment
UserSchema.methods.generateJwtToken = function(){
  return jwt.sign({user: this._id.toString()},"ZomatoApp");
}

//helper function
UserSchema.statics.findByEmailAndPhone=async(email,phoneNumber)=>{
 const checkUserByEmail= await UserModel.findOne({email});
 const checkUserByPhone= await UserModel.findOne({phoneNumber});

 if (checkUserByEmail || checkUserByPhone){
  throw new Error("user already Exist")
 }
return false
};
UserSchema.statics.findByEmailAndPassword=async(email,password)=>{
  const user = await UserModel.findOne({email});
  if (!user) throw new Error("user Does not exist");

  //compare the password
  const doesPasswordMatch = await bcrypt.compare(password, user.password)
  if(!doesPasswordMatch) throw new Error("Invalid credentials");
  return user;
}
UserSchema.pre('save',function(next){
  const user = this;
  
  //password is modified or not
if(!user.isModified('password'))return next();

//generate bcrypt and salt 
bcrypt.genSalt(8,(error,salt)=>{
  if(error)return next(error);

  // hash the passwor 8 time 
  bcrypt.hash(user.password,salt,(error,hash)=>{
    if (error)return next(error);
    // will be assinging  hashed password back
    user.password=hash;
    return next()
  })
})
})

export const UserModel = mongoose.model("users", UserSchema);
