import mongoose from "mongoose"
import * as dotenv from "dotenv"
import exposureData from "./exposure.js"
import Exposure from "../models/Exposure.js"

dotenv.config()

mongoose.connect(process.env.DATABASE_URL)

await Exposure.deleteMany({})
await Exposure.insertMany(exposureData) // 넣을 seed data로 교체

mongoose.connection.close()

// npm run seed
