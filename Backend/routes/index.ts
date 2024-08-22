import express from 'express'
import userRouter from './user'
import productRouter from './product'
const rootRouter = express.Router()

rootRouter.use(userRouter)
rootRouter.use(productRouter)

export default rootRouter