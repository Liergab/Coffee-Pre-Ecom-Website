import {z} from 'zod'

export const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8,{ message: 'Invalid Password'}).max(12)
})

export const registerSchema = z.object({
    firstName: z.string().min(1,{message:'Firstname is Required!'}),
    lastName:  z.string().min(1,{message:'Lastname is Required!'}),
    email : z.string().email(),
    password : z.string().min(8,{ message: 'Invalid Password'}).max(12),
    password_confirmation :z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});


export const verificationSchema = z.object({
    code: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
      }),
})

export const AddCoffeeSchema = z.object({
    name: z.string().min(1, { message: 'Name of Coffee is Required!' }),
    description: z.string().min(1, { message: 'Description is Required!' }),
    price: z.string(),
    // z.number().positive({ message: 'Price must be a positive number' }),  
    stock: z.string(),
    //z.number().int().nonnegative({ message: 'Stock must be a non-negative integer' }),  
    tags: z.string() ,
    imageFiles: z.instanceof(FileList).optional().refine(files => files && files.length > 0, {
        message: 'At least one image file is required',
      }),
})

export const EditCoffeeSchema = z.object({
    name: z.string().min(1, { message: 'Name of Coffee is Required!' }),
    description: z.string().min(1, { message: 'Description is Required!' }),
    price: z.string(),
    // z.number().positive({ message: 'Price must be a positive number' }),  
    stock: z.string(),
    //z.number().int().nonnegative({ message: 'Stock must be a non-negative integer' }),  
    tags: z.string() ,
    imageFiles: z.instanceof(FileList).optional().refine(files => files && files.length > 0, {
        message: 'At least one image file is required',
      }),
})