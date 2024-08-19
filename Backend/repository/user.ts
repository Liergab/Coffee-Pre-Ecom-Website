import User from "../model/USER_MODEL";
import { userType } from "../types";



class UserRepository {
    async register(userData:Partial<userType>):Promise<userType>{
        console.log('repository',userData)
        return await User.create(userData)
    }

    async getUserEmail(email:string):Promise<userType | null>{
        return await User.findOne({email}).exec()
    }
}

export default new UserRepository()