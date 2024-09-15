import mongoose from "mongoose"
import soilData from "./soil.js"
import Soil from "../models/Soil.js"
import * as dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.DATABASE_URL)

await Soil.deleteMany({})
await Soil.insertMany(soilData) // 넣을 seed data로 교체

mongoose.connection.close()

// npm run seed
