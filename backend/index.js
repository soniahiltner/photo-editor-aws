import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import serverless from 'serverless-http'
import { router as imageRouter } from './routes/image.js'
import { deleteFiles } from './utils/deleteFiles.js'
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

if (process.env.DEVELOPMENT) {
  app.use(cors())
}

app.disable("x-powered-by")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Delete all files in uploads, images and temp folders when server starts
deleteFiles()

// Mount the image router
app.use('/api/image', imageRouter)

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

if (process.env.DEVELOPMENT) {
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
}

export const handler = serverless(app)
