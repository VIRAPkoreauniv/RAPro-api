import mongoose from "mongoose"

const ExposureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    setting: {
      type: String,
    },
    depthBelowGradeToBaseOfFoundation: {
      type: Number,
    },
    foundationThickness: {
      type: Number,
    },
    fractionOfFoundationAreaWithCracks: {
      type: Number,
    },
    enclosedSpaceFloorArea: {
      type: Number,
    },
    enclosedSpaceHeight: {
      type: Number,
    },
    indoorAirExchangeRate: {
      type: Number,
    },
    buildingVentilationRate: {
      type: Number,
    },
    QsoilQbuilding: {
      type: Number,
    },
    averageVaporFlowRateIntoBldg: {
      type: Number,
    },
    eta: {
      type: Number,
    },
    Abf: {
      type: Number,
    },
    Hb: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const Exposure = mongoose.model("Exposure", ExposureSchema)

export default Exposure
