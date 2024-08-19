import { NextFunction, Request, Response } from "express";
import UserImplementation from '../services/implementation/user';
import { sendVerificationEmail } from "../config/email";

export const register = async (req:Request, res:Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const { email, password, firstName, lastName } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        console.log("Data being passed to UserImplementation.register:", {
            email,
            password,
            firstName,
            lastName,
            verificationToken,
            verificationTokenExpiresAt
        });

        const { token, user } = await UserImplementation.register({
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
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
            return res.status(409).json({ message: 'Email already used!' });
        }
        next(error);
    }
};