import mongoose from "mongoose"
import * as dotenv from "dotenv"
import Chemical from "../models/Chemical.js"

dotenv.config()

mongoose.connect(process.env.DATABASE_URL)

const computeNCRisk = (scenario, source, pathway, receptor) => {
  const Conc = source.conc
  const Sfo = Chemical.find({ constituent: source.chemicalOfConcern }).Sfo
  const Br = pathway.Br
  const EF = receptor.EF
  const ED = receptor.ED
  const IR = receptor.IR
  const RBAF = receptor.RBAF
  const BW = receptor.BW
  const AT = receptor.AT
  const SA = receptor.SA
  const M = receptor.M
  const RAF_d = Chemical.find({ constituent: source.chemicalOfConcern }).RfDd
  const RfD_o = Chemical.find({ constituent: source.chemicalOfConcern }).RfDo

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
