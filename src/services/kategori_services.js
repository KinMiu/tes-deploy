const model = require('../model/kategori')
const { requestResponse } = require('../utils/index')

let response

const create = async (data) => {
    await model.create(data)
    return { ...requestResponse.success, data: model }
}

const getAll = async(condition) => {
    return model.find(condition, { _id: false }, { lean: false })
}

const getById = async(condition) => {
    return model.findOne(condition)
}

const updateOne = async(condition, body) => {
    return model.updateOne(condition, body)
}

const deleteOne = (condition) => {
    return model.deleteOne(condition)
}

module.exports = {
    create,
    getAll,
    updateOne,
    getById,
    deleteOne
}