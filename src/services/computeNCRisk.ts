import mongoose from "mongoose"
import * as dotenv from "dotenv"
import Chemical from "../models/Chemical.js"
import {
  IPathway,
  IReceptor,
  ISource,
  ScenarioType,
} from "../types/s-p-r.type.js"
import { IChemicalData } from "../types/chemical.type.js"

dotenv.config()

if (process.env.DATABASE_URL) {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Failed to connect to DB"))
}

const computeNCRisk = async (
  scenario: ScenarioType,
  source: ISource,
  pathway: IPathway,
  receptor: IReceptor
) => {
  const chemicalData: IChemicalData[] = await Chemical.find({
    constituent: source.chemicalOfConcern,
  })

  const Conc = source.conc
  const Sfo = chemicalData[0].Sfo
  const Br = pathway.Br
  const EF = receptor.EF
  const ED = receptor.ED
  const IR = receptor.IR
  const RBAF = receptor.RBAF
  const BW = receptor.BW
  const AT = receptor.AT
  const SA = receptor.SA
  const M = receptor.M
  const RAF_d = chemicalData[0].RfDd
  const RfD_o = chemicalData[0].RfDo

  switch (scenario) {
    case 1:
      if (!Conc || !EF || !ED || !IR || !RBAF || !RfD_o || !BW || !AT) {
        return null
      }

      return ((Conc * EF * ED * IR * RBAF * 10) ^ -6) / (RfD_o * BW * AT * 365)
    case 2:
      if (!Conc || !Sfo || !EF || !ED || !SA || !M || !RAF_d || !BW || !AT) {
        return null
      }

      return (
        ((Conc * Sfo * EF * ED * SA * M * RAF_d * 10) ^ -6) / (BW * AT * 365)
      )
    case 4:
      if (!Conc || !EF || !ED || !BW || !AT || !RfD_o || !IR || !Br) {
        return null
      }

      return ((Conc * EF * ED) / (BW * AT * RfD_o * 365)) * (IR * Br + IR * Br)
    case 15:
      if (!Conc || !EF || !ED || !IR || !RfD_o || !BW || !AT) {
        return null
      }

      return (Conc * EF * ED * IR) / (RfD_o * BW * AT * 365)
    default:
      break
  }

  return null
}
export default computeNCRisk
