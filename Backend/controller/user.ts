import { NextFunction, Request, Response } from "express";
import UserImplementation from '../services/implementation/user';
import { sendVerificationEmail } from "../config/email";

export const register = async (req:Request, res:Response, next: NextFunction) => {
    try {
      
        const { email, password, firstName, lastName, role } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400)
            throw new Error('All fields Required!')
       
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  

        const { token, user } = await UserImplementation.register({
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            role:role,
            verificationToken,
            verificationTokenExpiresAt,
        });

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({
            message: 'Successfully registered',
            user
        });
    } catch (error: any) {
        if (error.message === 'Email already used!') {
            res.status(409);
        }
        next(error);
    }
};


export const verifyEmail = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const {code} = req.body
        const user = await UserImplementation.verifyEmail(code)

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: {
                ...user.toObject(),
                password: undefined,
            },
        });
        
    } catch (error:any) {
        if(error.message === 'Invalid or expired verification code'){
            res.status(403)
        }
        next(error)
    }
}


export const login = async(req:Request,res:Response,next:NextFunction) => {
    try {

        const {email, password} = req.body

        if(!email || !password){
            res.status(400)
            throw new Error('All Fields Required!')
       
        }
        const {token, user} = await UserImplementation.login(email,password)

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        res.status(200).json(user)

    } catch (error:any) {
        if(error.message === 'Invalid Email or Password!'){
            res.status(401)
        }
        if(error.message === 'Please verify your email. A new verification code has been sent to your email.'){
            res.status(403)
        }
        next(error)
    }
}

export const UpdateUserProfile = async (req:Request,res:Response, next:NextFunction) => {
    try {
        const {id} = req.params
        const userId = req.user?.id

        if(userId !== id){
            res.status(403)
            throw new Error('Access denied: You do not have permission to update someone else\'s profile.')
            return
        }
        const user = await UserImplementation.updateUserProfile(id, req.body)

        if(!user){
            res.status(404)
            throw new Error('User not found')
        }

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}


export const currentUser = async (req:Request,res:Response, next:NextFunction) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        next(error)
    }
}