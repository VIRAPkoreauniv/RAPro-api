import mongoose from "mongoose"

const ChemicalSchema = new mongoose.Schema(
  {
    constituent: {
      type: String,
    },
    henryConstant: {
      type: Number,
    },
    logKoclogKd: {
      type: Number,
    },
    KocKd: {
      type: String,
    },
    Sfo: {
      type: Number,
    },
    RfDo: {
      type: Number,
    },
    RfDd: {
      type: Number,
    },
    SFd: {
      type: Number,
    },
    URF: {
      type: Number,
    },
    Rfc: {
      type: Number,
    },
    Dair: {
      type: Number,
    },
    Dwat: {
      type: Number,
    },
    BCF: {
      type: Number,
    },
    IUR: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

// mongoose.mode(컬렉션 명, 스키마)
const Chemical = mongoose.model("Chemical", ChemicalSchema)

export default Chemical
