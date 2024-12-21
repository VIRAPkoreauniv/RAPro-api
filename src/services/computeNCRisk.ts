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

  // chemical data
  const Sfo = chemicalData[0].Sfo
  const URF = chemicalData[0].URF
  const Sfd = chemicalData[0].SFd
  const RfD_o = chemicalData[0].RfDo
  const RfD_d = chemicalData[0].RfDd
  const RfC = chemicalData[0].Rfc

  // source
  const Conc = source.conc

  // pathway
  const Br = pathway.Br
  const VF = pathway.VF
  const PEF = pathway.PEF
  const LF = pathway.LF
  const DAF = pathway.DAF
  const FI = pathway.FI
  const DF = pathway.DF

  // receptor
  const EF = receptor.EF
  const ED = receptor.ED
  const IR = receptor.IR
  const RBAF = receptor.RBAF
  const BW = receptor.BW
  const AT = receptor.AT
  const SA = receptor.SA
  const M = receptor.M
  const RAF_d = receptor.RAF_d
  const EV = receptor.EV
  const BCF = receptor.BCF
  const Z = receptor.Z
  const ET = receptor.ET

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
    case 3:
      if (!Conc || !EF || !ED || !VF || !PEF || !RfC || !AT) return null

      return (Conc * EF * ED * (VF + PEF)) / (RfC * AT)
    case 4:
      if (!Conc || !EF || !ED || !BW || !AT || !RfD_o || !IR || !Br) {
        return null
      }

      return ((Conc * EF * ED) / (BW * AT * RfD_o * 365)) * (IR * Br + IR * Br)
    case 8:
      if (!Conc || !EF || !ED || !VF || !RfC || !AT) {
        return null
      }

      return (Conc * EF * ED * VF) / (RfC * AT * 365)
    case 9:
      if (!Conc || !EF || !ED || !VF || !RfC || !AT) {
        return null
      }

      return (Conc * EF * ED * VF) / (RfC * AT * 365)
    case 10:
      if (!Conc || !EF || !ED || !IR || !LF || !RfD_o || !BW || !AT) {
        return null
      }

      return (Conc * EF * ED * IR * LF) / (RfD_o * BW * AT * 365)
    case 11:
      if (
        !Conc ||
        !ED ||
        !EV ||
        !ET ||
        !IR ||
        !RfD_o ||
        !SA ||
        !RfD_d ||
        !Z ||
        !FI ||
        !BCF ||
        !LF ||
        !AT ||
        !DAF ||
        !DF ||
        !BW
      ) {
        return null
      }

      return (
        (Conc *
          ED *
          ((EV * ET * IR) / RfD_o +
            (EV * SA * Z) / RfD_d +
            (IR * FI * BCF) / RfD_o) *
          LF) /
        (BW * AT * 365 * DAF * DF)
      )
    case 13:
      if (!Conc || !EF || !ED || !VF || !RfC || !AT) {
        return null
      }

      return (Conc * EF * ED * VF) / (RfC * AT * 365)
    case 14:
      if (!Conc || !EF || !ED || !VF || !RfC || !AT) {
        return null
      }

      return (Conc * EF * ED * VF) / (RfC * AT * 365)
    case 15:
      if (!Conc || !EF || !ED || !IR || !RfD_o || !BW || !AT) {
        return null
      }

      return (Conc * EF * ED * IR) / (RfD_o * BW * AT * 365)
    case 16:
      if (
        !Conc ||
        !ED ||
        !EV ||
        !ET ||
        !IR ||
        !RfD_o ||
        !SA ||
        !Z ||
        !RfD_d ||
        !FI ||
        !BCF ||
        !BW ||
        !AT ||
        !DAF ||
        !DF
      ) {
        return null
      }

      return (
        (Conc *
          ED *
          ((EV * ET * IR) / RfD_o +
            (EV * SA * Z) / RfD_d +
            (IR * FI * BCF) / RfD_o)) /
        (BW * AT * 365 * DAF * DF)
      )
    default:
      break
  }

  return null
}
export default computeNCRisk
