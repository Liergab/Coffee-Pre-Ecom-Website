import { userType } from "../../types";
import UserRepository from '../../repository/user'
import { comparedPassword, hashPassword } from "../../config/bcrypt";
import generateToken from "../../utils/generateToken";
import { sendVerificationEmail, sendWelcomeEmail } from "../../config/email";


class UserImplementation {
    async register(userData:Partial<userType>):Promise<{token:string ,user:userType} >{
     
        const userExist = await UserRepository.getUserEmail(userData.email!)

        if(userExist){
            throw new Error('Email already used!')
        }

        userData.password = await hashPassword(userData.password!)
        const newUser =  await UserRepository.register(userData)
        const token = generateToken(newUser._id)

        return {token, user:newUser}
    }

    async verifyEmail(code:string):Promise<userType>{
        const user = await UserRepository.findVerificationToken(code)

        if(!user){
            throw new Error('Invalid or expired verification code')
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        const updatedUser = await UserRepository.save(user);

        await sendWelcomeEmail(updatedUser.email, `${updatedUser.firstName} ${updatedUser.lastName}`);

        return updatedUser;
    }

    async login(email:string, password:string):Promise<{token:string, user:userType}>{

        const userExist = await UserRepository.getUserEmail(email);

        if (!userExist) {
            throw new Error('Invalid Email or Password!');
        }
    
        const isPasswordIsValid = await comparedPassword(password, userExist.password);
    
        if (!isPasswordIsValid) {
            throw new Error('Invalid Email or Password!');
        }
    
        if (!userExist.isVerified) {
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
            const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
            // Update the user with the new verification token
            userExist.verificationToken = verificationToken;
            userExist.verificationTokenExpiresAt = verificationTokenExpiresAt;
    
            // Ensure that `userExist` is a Mongoose document
            await UserRepository.save(userExist as any);
    
            // Send verification email
            await sendVerificationEmail(email, verificationToken);
    
            throw new Error('Please verify your email. A new verification code has been sent to your email.');
        }
    
        userExist.lastLogin = new Date();
        await UserRepository.save(userExist as any);
    
        const token = generateToken(userExist.id);
        const { password: _, address: __, ...userWithoutPassword } = userExist.toObject();
    
        return { token, user: userWithoutPassword };
    }

    async updateUserProfile(id:string ,userData:Partial<userType>):Promise<userType | null>{
        if(userData.password){
            userData.password = await hashPassword(userData.password)
        }
        const user = await UserRepository.update(id, userData)

        if (!user) {
            return null;
        }
        const{password:_, ...userWithoutPassword} = user.toObject();

        return userWithoutPassword
    }
}
export default new UserImplementation()