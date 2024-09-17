export type ScenarioType = number
export interface ISource {
  chemicalOfConcern: string
  conc: number
}
export interface IPathway {
  soilType?: string
  Br?: number
}
export interface IReceptor {
  exposureType?: string
  RBAF?: number
  AT?: number
  EF?: number
  ED?: number
  BW?: number
  IR?: number
  RAF_d?: number
  M?: number
  SA?: number
}
