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