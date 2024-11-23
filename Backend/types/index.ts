import { Document } from "mongoose";

export interface userType extends Document  {
    _id       : string;
    email     : string;
    password  : string;
    firstName? : string;
    lastName?  : string;
    role: 'user' | 'admin' | 'vendor';
    address?  : addressType;
    lastLogin : Date;
    isVerified: Boolean;
    resetPasswordToken: String;
    resetPasswordExpiresAt: Date;
	verificationToken?: String;
	verificationTokenExpiresAt?: Date;

}

type addressType = {
    street?   : string;
    barangay? : string;
    city?     : string
    municipality? : string;
    province? : string;
    postalCode? :string
}

export type ProductSearchResponse = {
    data:productType[],
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}



export interface productType extends Document {
    userId      : string;
    name        : string;
    description : string;
    price       : number;
    tags        : string[];
    imageUrl    : string[];
    stock       : number
    starRating  : number;
}