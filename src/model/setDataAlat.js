const mongoose = require("mongoose");
const collectionName = "setDataAlat";

const alatSchema = new mongoose.Schema({
  GUID: {
    type: String,
  },
  MAC_ADDRESS: {
    type: String,
  },
  DATA_SENSOR:
  {
    MIN: Number,
    MAX: Number
  },
  IDUSER: {
    type: String,
  },
  CREATED_AT: {
    type: Date,
    default: () => new Date(),
  },
  UPDATED_AT: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model(collectionName, alatSchema);
