import mongoose, { model, Schema } from "mongoose";
import { userType } from "../types";

const userSchema = new Schema({
    email:{
        type     : String,
        unique   : true,
        required : true
    },
    password:{
        type     : String,
        required : true
    },
    firstName:{
        type     : String
    },
    lastName:{
        type     : String
    },
    address:{
        street:{
            type : String
        },
        barangay: { 
            type: String
         },
        city: {
             type: String
         },
        municipality: { 
            type: String 
        },
        province: { 
            type: String 
        },
        postalCode: {
             type: String 
        }
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
},{timestamps:true})

const User = model<userType>("User", userSchema)

export default  User