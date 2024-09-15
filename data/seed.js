import mongoose from "mongoose"
import * as dotenv from "dotenv"
import Chemical from "../models/Chemical.js"
import chemicalData from "./chemical.js"

dotenv.config()

mongoose.connect(process.env.DATABASE_URL)

await Chemical.deleteMany({})
await Chemical.insertMany(chemicalData) // 넣을 seed data로 교체

mongoose.connection.close()

// npm run seed
