import express from 'express'
import { router } from './routes'
import 'dotenv/config'
import cors from 'cors'
// App
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(router)

// Set port
const port = '4242'
// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`))
