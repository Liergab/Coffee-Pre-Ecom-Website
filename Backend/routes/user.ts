import express from 'express'
import * as controller from '../controller/user'
const userRouter = express.Router()

userRouter.post('/register',controller.register)

export default userRouter