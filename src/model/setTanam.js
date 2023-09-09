const mongoose = require("mongoose");
const collectionName = "tanam";

const Schema = new mongoose.Schema({
  GUID: {
    type: String,
  },
  MEDIA_TANAM: {
    type: String
  },
  IDTANAMAN: {
    type: String,
  },
  ALAT: [{
    MAC_ADDRESS: String,
  }],
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

module.exports = mongoose.model(collectionName, Schema);
