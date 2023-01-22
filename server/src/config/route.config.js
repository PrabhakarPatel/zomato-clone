
import JwtPassport from "passport-jwt";
import { UserModel } from "../database/allModels";

const JWTStrategy = JwtPassport.Strategy;
const ExtractJWT = JwtPassport.ExtractJwt;

//Authorization "bearer sometokenstring"

const options= {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:"ZomatoApp",
}
export default(passport)=>{
    passport.use(
        new JWTStrategy(options,async(jwt__payload,done)=>{
            try{
                const doesUserExsit =await UserModel.findById(jwt__payload.user);
                if(!doesUserExsit) return done(null,false)
                return done(null,doesUserExsit);

            }catch(error){
                throw new Error(error);
            }
        })
    )
}
