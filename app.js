import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import { SOIL_DATABASE } from "./data/mock.js"

dotenv.config()

const app = express()

const corsOptions = {
  origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions))
app.use(express.json())

// request handler
app.get("/hello", (req, res) => {
  res.send(SOIL_DATABASE["Clay"])
})

app.get("/soil-data", (req, res) => {
  const name = req.query.name

  res.send(SOIL_DATABASE[name])
})

app.listen(process.env.PORT || 3000, () => console.log("Server Started"))

// 실행 : npm run dev
