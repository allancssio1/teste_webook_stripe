import 'dotenv/config'
import express from 'express'
import https from 'https'
import fs from 'fs'
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

const options: any = {
  cert: fs.readFileSync(`${__dirname}/keys/code.crt`),
  key: fs.readFileSync(`${__dirname}/keys/code.key`),
}

https.createServer(options, app).listen(3001, () => {
  console.log('Server running on https://localhost:443')
})
