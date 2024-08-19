import { userType } from "../../types";
import UserRepository from '../../repository/user'
import { hashPassword } from "../../config/bcrypt";
import generateToken from "../../utils/generateToken";


class UserImplementation {
    async register(userData:Partial<userType>):Promise<{token:string ,user:userType} >{
        console.log('fron serviceimp',userData)
        const userExist = await UserRepository.getUserEmail(userData.email!)

        if(userExist){
            throw new Error('Email already used!')
        }

        userData.password = await hashPassword(userData.password!)
        const newUser =  await UserRepository.register(userData)
        const token = generateToken(newUser._id)

        return {token, user:newUser}
    }
}

export default new UserImplementation()