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
    price: z.number()
        .min(0, { message: 'Price must be a non-negative number' })
        .or(z.string().regex(/^\d+$/, { message: 'Price must be a valid number' })),
    stock: z.number()
        .min(0, { message: 'Stock must be a non-negative number' })
        .or(z.string().regex(/^\d+$/, { message: 'Stock must be a valid number' })),
    tags: z.string().min(1, { message: 'At least one tag is required' }),
    images: z.array(z.instanceof(File))
        .min(1, { message: 'At least one image is required' })
        .max(6, { message: 'Maximum 6 images allowed' }),
})

export const EditCoffeeSchema = z.object({
    name: z.string().min(1, { message: 'Name of Coffee is Required!' })
        .max(50, { message: 'Name must be less than 50 characters' }),
    description: z.string()
        .min(1, { message: 'Description is Required!' })
        .max(500, { message: 'Description must be less than 500 characters' }),
    price: z.number()
        .min(0, { message: 'Price must be a positive number' })
        .or(z.string().regex(/^\d+$/, { message: 'Price must be a valid number' })),
    stock: z.number()
        .min(0, { message: 'Stock must be a non-negative number' })
        .or(z.string().regex(/^\d+$/, { message: 'Stock must be a valid number' })),
    tags: z.string()
        .transform(val => val.split(',').map(tag => tag.trim()))
        .or(z.array(z.string())),
    imageFiles: z.instanceof(FileList)
        .optional()
        .refine(files => !files || files.length === 0 || Array.from(files).every(file => 
            file.type.startsWith('image/')), {
            message: 'All files must be images',
        })
})