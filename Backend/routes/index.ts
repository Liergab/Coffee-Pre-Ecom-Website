import express from 'express'
import userRouter from './user'
const rootRouter = express.Router()

rootRouter.use(userRouter)

export default rootRouter