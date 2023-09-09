const date = require('date-and-time')
const mongoose = require('mongoose')
const collectionName = 'produk'

const barangSchema = new mongoose.Schema(
    {
        IDPRODUK: {
            type: String
        },
        NAMA_PRODUK: {
            type: String,
        },
        IDKATEGORI: {
            type: String
        },
        HARGA: {
            type: Number
        },
        STOK: {
            type: Number
        },
        IDUSER: {
            type: String
        },
        GAMBAR: {
            type: String,
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

module.exports = mongoose.model(collectionName, barangSchema)