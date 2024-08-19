import jwt from 'jsonwebtoken'
import env from '../utils/validate'

const generateToken =  (id:string) => {
    return jwt.sign({id}, env.SECRET_KEY,{expiresIn:'30d'} )
}

export default generateToken