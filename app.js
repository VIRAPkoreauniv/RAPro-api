import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import Soil from "./models/Soil.js"

dotenv.config()

const app = express()
const corsOptions = {
  origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions))
app.use(express.json())

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"))

app.get("/soil-data", async (req, res) => {
  const name = req.query.name
  const soilData = await Soil.find({ name: name })

  res.send(soilData)
})

app.listen(process.env.PORT || 3000, () => console.log("Server Started"))
