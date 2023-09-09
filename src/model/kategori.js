const mongoose = require('mongoose')
const collectionName = 'kategori'

const kategoriSchema = new mongoose.Schema(
    {
        IDKATEGORI: {
            type: String
        },
        NAMA_KATEGORI: {
            type: String,
        },
        KETERANGAN: {
            type: String
        },
        CREATED_AT: {
            type: Date,
            default: () => new Date()
        },
        UPDATED_AT: {
            type: Date,
            default: () => new Date()
        }
    }
)

module.exports = mongoose.model(collectionName, kategoriSchema)