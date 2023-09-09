require('dotenv').config()
const logger = require('./logger')
const path = require('path')
const multer = require('multer')
const random = require('randomstring')
const fs = require('fs')

const MAX_SIZE = 5000000

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        cb(null, './src/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_SIZE
    }
})

const cekNull = (fileUpload) => {
    if (fileUpload === undefined || fileUpload === null) {
        return null
    } else {
        return fileUpload[0].filename
    }
}

const deleteImage = (image) => {
    fs.unlinkSync(`./public/images/${image}`)
}

// REQUEST RESPONSE
const requestResponse = {
    success: {
        code: 200,
        status: true,
        message: 'BERHASIL MEMUAT PERMINTAAN'
    },
    incomplete_body: {
        code: 400,
        status: false,
        message: 'PERMINTAAN DALAM MASALAH, CEK PERMINTAAN ANDA'
    },
    unauthorized: {
        code: 401,
        status: false,
        message: 'UNAUTHORIZED'
    },
    not_found: {
        code: 404,
        status: false,
        message: 'FILE TIDAK DITEMUKAN'
    },
    unprocessable_entity: {
        code: 422,
        status: false,
        message: 'PERMINTAAN TIDAK DAPAT DI PROSES'
    },
    server_error: {
        code: 500,
        status: false,
        message: 'SERVER DALAM GANGGUAN, SILAHKAN KONTAK ADMINISTRATOR'
    },
}

module.exports = {
    upload,
    cekNull,
    deleteImage,
    requestResponse
}