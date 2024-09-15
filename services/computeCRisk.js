import mongoose from "mongoose"
import * as dotenv from "dotenv"
import Chemical from "../models/Chemical.js"

dotenv.config()

mongoose.connect(process.env.DATABASE_URL)

const computeCRisk = async (scenario, source, pathway, receptor) => {
  const Conc = source.concentration
  const SF_o = source.chemicalOfConcern
    ? await Chemical.find({ constituent: source.chemicalOfConcern }).SF_o
    : 0
  const Br = pathway.Br
  const EF = receptor.EF
  const ED = receptor.ED
  const IR = receptor.IR
  const RBAF = receptor.RBAF
  const BW = receptor.BW
  const AT = receptor.AT
  const SA = receptor.SA
  const M = receptor.M
  const RAF_d = receptor.RAF_d

  switch (scenario) {
    case 1:
      if (!Conc || !SF_o || !EF || !ED || !IR || !RBAF || !BW || !AT) {
        return null
      }

      return ((Conc * SF_o * EF * ED * IR * RBAF * 10) ^ -6) / (BW * AT * 365)
    case 2:
      if (!Conc || !SF_o || !EF || !ED || !SA || !M || !RAF_d || !BW || !AT) {
        return null
      }

      return (
        ((Conc * SF_o * EF * ED * SA * M * RAF_d * 10) ^ -6) / (BW * AT * 365)
      )
    case 4:
      if (!Conc || !SF_o || !EF || !ED || !BW || !AT || !IR || !Br) {
        return null
      }

      return ((Conc * SF_o * EF * ED) / (BW * AT * 365)) * (IR * Br + IR * Br)
    case 15:
      if (!Conc || !SF_o || !EF || !ED || !IR || !BW || !AT) {
        return null
      }

      return (Conc * SF_o * EF * ED * IR) / (BW * AT * 365)
    default:
      break
  }

  return null
}

export default computeCRisk
