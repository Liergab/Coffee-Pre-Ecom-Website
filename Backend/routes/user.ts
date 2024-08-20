import express from 'express'
import * as controller from '../controller/user'
import user from '../repository/user'
const userRouter = express.Router()

userRouter.post('/register',controller.register)
userRouter.post('/login', controller.login)
userRouter.post('/email-verify', controller.verifyEmail)
export default userRouter