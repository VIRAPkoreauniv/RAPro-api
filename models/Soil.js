import mongoose from "mongoose"

const SoilSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
    totalPorosity: {
      type: Number,
    },
    WaterFilledPorosity: {
      type: Number,
    },
    bulkDensity: {
      type: Number,
    },
    saturatedHydraulicConductivity: {
      type: Number,
    },
    capillaryZoneWaterFilledPorosity: {
      type: Number,
    },
    capillaryZoneHeight: {
      type: Number,
    },
    a1: {
      type: Number,
    },
    N: {
      type: Number,
    },
    M: {
      type: Number,
    },
    qr: {
      type: Number,
    },
    meanGrainDiameter: {
      type: Number,
    },
    nwRange: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
  {}
)

// mongoose.mode(컬렉션 명, 스키마)
const Soil = mongoose.model("Soil", SoilSchema)

export default Soil
