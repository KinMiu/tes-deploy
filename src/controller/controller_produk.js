require('dotenv').config()
const service = require('../services/produk_services')
const logger = require('../utils/logger')
const { requestResponse, deleteImage } = require('../utils/index')
const date = require('date-and-time')

let response

const create = async (data) => {
    try {
        const value = await service.create(data)
        response = { ...value }
        return response
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
        return response
    }
}

const getAll = async (req, res) => {
    try {
        const data = await service.getAll(req.body)
        response = { ...requestResponse.success, data: data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getAllByUser = async (req, res) => {
    try {
        const data = await service.getAllByUser({ IDUSER: req.params.id })
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getAllByKategori = async (req, res) => {
    try {
        const data = await service.getAllByKategori({ IDKATEGORI: req.params.id })
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getById = async (req, res) => {
    try {
        const data = await service.getById({ IDPRODUK: req.params.id })
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const updateOne = async (data, id, changeImage) => {
    console.log(data, changeImage, id)
    try {
        const value = await service.updateOne({ IDPRODUK: id })
        if (changeImage === true) {
            deleteImage(data.GAMBAR_LAMA)
        }
        response = { ...requestResponse.success, value }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    return response
}

const deleteOne = async (req, res) => {
    try {
        const data = await service.deleteOne({ IDPRODUK: req.params.id })
        console.log(data)
        deleteImage(data.GAMBAR)
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

module.exports = {
    create,
    getAll,
    getAllByUser,
    getAllByKategori,
    getById,
    updateOne,
    deleteOne
}