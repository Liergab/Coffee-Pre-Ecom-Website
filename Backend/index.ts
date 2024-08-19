import express from 'express'
import cors from 'cors'
import db from './config/db'
import env from './utils/validate'
import rootRouter from './routes'
import { errorValidation, NotFoundEndpoint } from './middleware/error'

const app = express()
const PORT = env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/v1/api',rootRouter)
app.use(NotFoundEndpoint)
app.use(errorValidation)


app.listen(PORT,() => {
    console.log(`localhost:${PORT}`)
    db()
})