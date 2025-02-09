export interface userType  {
    _id       : string;
    email     : string;
    password  : string;
    firstName? : string;
    lastName?  : string;
    role: 'user' | 'admin' | 'vendor';
    address?  : addressType;
    lastLogin : Date;
    isVerified: boolean;
    resetPasswordToken: string;
    resetPasswordExpiresAt: Date;
	verificationToken?: string;
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



export type productType ={
    _id          : string;
    userId      : string;
    name        : string;
    description : string;
    price       : number;
    tags        : string[];
    imageUrl    : string[];
    stock       : number
}

export type ProductSearchResponse = {
    data:productType[],
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}