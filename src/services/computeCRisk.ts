import mongoose from "mongoose"
import * as dotenv from "dotenv"
import Chemical from "../models/Chemical"
import { IPathway, IReceptor, ISource, ScenarioType } from "../types/s-p-r.type"
import { IChemicalData } from "../types/chemical.type"

dotenv.config()

if (process.env.DATABASE_URL) {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Failed to connect to DB"))
}

const computeCRisk = async (
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
      if (!Conc || !Sfo || !EF || !ED || !IR || !RBAF || !BW || !AT) {
        return null
      }

      return ((Conc * Sfo * EF * ED * IR * RBAF * 10) ^ -6) / (BW * AT * 365)
    case 2:
      if (!Conc || !Sfo || !EF || !ED || !SA || !M || !RAF_d || !BW || !AT) {
        return null
      }

      return (
        ((Conc * Sfo * EF * ED * SA * M * RAF_d * 10) ^ -6) / (BW * AT * 365)
      )
    case 3:
      if (!Conc || !EF || !ED || !URF || !VF || !PEF || !AT) return null

      return (Conc * EF * ED * URF * 1000 * (VF + PEF)) / (AT * 365)
    case 4:
      if (!Conc || !Sfo || !EF || !ED || !BW || !AT || !IR || !Br) {
        return null
      }

      return ((Conc * Sfo * EF * ED) / (BW * AT * 365)) * (IR * Br + IR * Br)
    case 8:
      if (!Conc || !EF || !ED || !URF || !VF || !AT) {
        return null
      }

      return (Conc * EF * ED * URF * 1000 * VF) / (AT * 365)
    case 9:
      if (!Conc || !EF || !ED || !URF || !VF || !AT) {
        return null
      }

      return (Conc * EF * ED * URF * 1000 * VF) / (AT * 365)
    case 10:
      if (!Conc || !Sfo || !EF || !ED || !IR || !LF || !BW || !AT) {
        return null
      }

      return (Conc * Sfo * EF * ED * IR * LF) / (BW * AT * 365)
    case 11:
      if (
        !Conc ||
        !ED ||
        !Sfo ||
        !EV ||
        !IR ||
        !SA ||
        !Sfo ||
        !FI ||
        !BCF ||
        !BW ||
        !AT ||
        !DAF ||
        !DF ||
        !LF ||
        !Z ||
        !Sfd ||
        !DF ||
        !ET
      ) {
        return null
      }

      return (
        (Conc *
          ED *
          (Sfo * EV * ET * IR + Sfd * EV * SA * Z + Sfo * IR * FI * BCF) *
          LF) /
        (BW * AT * 365 * DAF * DF)
      )
    case 13:
      if (!Conc || !EF || !ED || !URF || !VF || !AT) {
        return null
      }

      return (Conc * EF * ED * URF * 1000 * VF) / (AT * 365)
    case 14:
      if (!Conc || !EF || !ED || !URF || !VF || !AT) {
        return null
      }

      return (Conc * EF * ED * URF * 1000 * VF) / (AT * 365)
    case 15:
      if (!Conc || !Sfo || !EF || !ED || !IR || !BW || !AT) {
        return null
      }

      return (Conc * Sfo * EF * ED * IR) / (BW * AT * 365)
    case 16:
      if (
        !Conc ||
        !ED ||
        !Sfo ||
        !EV ||
        !ET ||
        !IR ||
        !Sfd ||
        !SA ||
        !Z ||
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
          (Sfo * EV * ET * IR + Sfd * EV * SA * Z + Sfo * IR * FI * BCF)) /
        (BW * AT * 365 * DAF * DF)
      )
    default:
      break
  }

  return null
}

export default computeCRisk
