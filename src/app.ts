import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import Soil from "./models/Soil.js"
import Chemical from "./models/Chemical.js"
import Exposure from "./models/Exposure.js"
import asyncHandler from "./utils/asyncHandler.js"
import computeNCRisk from "./services/computeNCRisk.js"

dotenv.config()

const app = express()
const corsOptions: Record<string, (string | undefined)[]> = {
  origin: [process.env.DEV_URL, process.env.PRODUCTION_URL],
}

app.use(cors(corsOptions))
app.use(express.json())
app.listen(process.env.PORT || 3000, () => console.log("Server Started"))

if (process.env.DATABASE_URL) {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Failed to connect to DB"))
}
app.get(
  "/soil-data",
  asyncHandler(async (req, res) => {
    const name = req.query.name
    const soilData = await Soil.find({ name: name })

    if (soilData.length > 0) {
      res.status(200).send(soilData)
    } else {
      res.status(404).send({ message: "Cannot find soil data." })
    }
  })
)

app.get(
  "/chemical-data",
  asyncHandler(async (req, res) => {
    const constituent = req.query.constituent
    const chemicalData = await Chemical.find({ constituent: constituent })

    if (chemicalData.length > 0) {
      res.status(200).send(chemicalData)
    } else {
      res.status(404).send({ message: "Cannot find chemical data." })
    }
  })
)

app.get(
  "/exposure-data",
  asyncHandler(async (req, res) => {
    const name = req.query.name
    const exposureData = await Exposure.find({ name: name })

    if (exposureData.length > 0) {
      res.status(200).send(exposureData)
    } else {
      res.status(404).send({ message: "Cannot find exposure data." })
    }
  })
)

app.post(
  "/c-risk",
  asyncHandler(async (req, res) => {
    const scenario = req.body.scenario
    const source = req.body.source
    const pathway = req.body.pathway
    const receptor = req.body.receptor

    const C_Risk = await computeNCRisk(scenario, source, pathway, receptor)

    res.status(200).send({ C_Risk })
  })
)

app.post(
  "/nc-risk",
  asyncHandler(async (req, res) => {
    const scenario = req.body.scenario
    const source = req.body.source
    const pathway = req.body.pathway
    const receptor = req.body.receptor

    const NC_Risk = await computeNCRisk(scenario, source, pathway, receptor)

    res.status(200).send({ NC_Risk })
  })
)

app.get(
  "/soil-list",
  asyncHandler(async (req, res) => {
    const soilData = await Soil.find({})
    const soilNameList = soilData.map((data) => {
      return data.name
    })

    res.status(200).send(soilNameList)
  })
)

app.get(
  "/chemical-list",
  asyncHandler(async (req, res) => {
    const chemicalData = await Chemical.find({})
    const chemicalNameList = chemicalData.map((data) => {
      return data.constituent
    })

    res.status(200).send(chemicalNameList)
  })
)

app.get(
  "/exposure-list",
  asyncHandler(async (req, res) => {
    const exposureData = await Exposure.find({})
    const exposureNameList = exposureData.map((data) => {
      return data.name
    })

    res.status(200).send(exposureNameList)
  })
)
