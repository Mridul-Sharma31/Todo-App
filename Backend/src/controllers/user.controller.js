import { User } from "../models/user.model.js";
import { logger } from "../utils/logger.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"


const registerUser = async (req,res,next) => {
    
    try{
        const { email, name, username, password } = req.body;

        if( 
            [email,name,username,password].some( (field) => !field)
                
        ){
            throw new apiError(400, "all fields are req");
        }
        
        const existedUser = await User.findOne(
            {
                $or: [ {username} , {email}]
            }
        )

        if(existedUser){
            throw new apiError(409, "user already exists")
        }

        const user = await User.create({
            username,
            email,
            password,
            name
        })

        const createdUser = await User.findById(user._id).select("-password");

        if(!createdUser){
            throw new apiError(500, "error while registering the user")
        }

        return res.status(201).json(
            new apiResponse(201,createdUser )
        )
    }
    
    catch (error){
        next(error);
    }
}

export { registerUser };
