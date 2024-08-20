import express from 'express'
import * as controller from '../controller/user'
import { authMiddleware } from '../middleware/authMiddleware'
const userRouter = express.Router()

userRouter.post('/register',controller.register)
userRouter.post('/login', controller.login)
userRouter.post('/email-verify', controller.verifyEmail)
userRouter.put('/user/:id',authMiddleware,controller.UpdateUserProfile)
userRouter.get('/user/current-user', authMiddleware, controller.currentUser)
export default userRouter