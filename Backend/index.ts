import express from 'express'
import cors from 'cors'
import db from './config/db'
import env from './utils/validate'
import rootRouter from './routes'
import cookieParser from 'cookie-parser'
import { errorValidation, NotFoundEndpoint } from './middleware/error'


const PORT = env.PORT
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/v1/api',rootRouter)
app.use(NotFoundEndpoint)
app.use(errorValidation)


app.listen(PORT,() => {
    console.log(`localhost:${PORT}`)
    db()
})