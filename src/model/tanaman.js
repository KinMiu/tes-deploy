const mongoose = require("mongoose");
const collectionName = "tumbuhan";

const Schema = new mongoose.Schema({
  GUID: {
    type: String,
  },
  NAMA_TANAMAN: {
    type: String,
  },
  JENIS_TANAMAN: {
    type: String,
  },
  DESKRIPSI: {
    type: String,
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

module.exports = mongoose.model(collectionName, Schema);
