import User from "../model/USER_MODEL";
import { userType } from "../types";



class UserRepository {
    async register(userData:Partial<userType>):Promise<userType>{
  
        return await User.create(userData)
    }

    async getUserEmail(email:string):Promise<userType | null>{
        return await User.findOne({email}).exec()
    }

    async findVerificationToken(code:string):Promise<userType | null>{
        return await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })
    }

    async save (user:userType):Promise<userType>{
        return await user.save()
    }

    async update(id:string,userData:Partial<userType>):Promise<userType | null>{
        return await User.findByIdAndUpdate(id,userData,{new:true}).exec()
    }
}

export default new UserRepository()