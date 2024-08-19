import bcrypt from 'bcryptjs'

export const hashPassword = async(password:string):Promise<string>=>{
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

export const comparedPassword = async (plainPassword:string, hashPassword:string):Promise<Boolean> => {
    return await bcrypt.compare(plainPassword, hashPassword)
}