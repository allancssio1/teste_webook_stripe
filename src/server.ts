import express, { NextFunction, Request, Response } from 'express'
import { router } from './routes'
import 'dotenv/config'
import cors from 'cors'
// App
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack) // Log do erro no console
  if (err)
    res.status(500).json({
      message: 'Ocorreu um erro interno no servidor',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    })

  next()
})
app.use(router)

// Set port
const port = '4242'
// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`))
