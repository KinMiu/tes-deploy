const mongoose = require('mongoose')
const collectionName = 'alat'

const alatSchema = new mongoose.Schema(
    {
        GUID: {
            type: String
        },
        MAC_ADDRESS: {
            type: String,
        },
        NAMA_ALAT: {
            type: String
        },
        DATA_SENSOR: {
            type: Number,
            default: null
        },
        STATUS: {
            type: Number,
            default: 1
        },
        TYPE: {
            type: String
        },
        IDUSER: {
            type: String,
            default: '-'
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

module.exports = mongoose.model(collectionName, alatSchema)