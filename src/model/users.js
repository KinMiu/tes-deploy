const mongoose = require('mongoose')
const collectionName = 'user'

const schema = new mongoose.Schema(
    {
        IDUSER: {
            type: String
        },
        NAMA: {
            type: String,
        },
        EMAIL: {
            type: String
        },
        ALAMAT: {
            type: String
        },
        NO_TELP: {
            type: String
        },
        PASSWORD: {
            type: String
        },
        ROLE: {
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

module.exports = mongoose.model(collectionName, schema)