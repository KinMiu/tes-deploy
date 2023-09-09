const model = require('../model/produk')
const { requestResponse } = require('../utils/index')

let response

const create = async (data) => {
    await model.create(data)
    return { ...requestResponse.success, data: model }
}

const getAll = async (condition) => {
    // return await model.find(condition)
    return model.aggregate([
        {
            $match: {
                $and: [condition]
            }
        },
        {
            $lookup: {
                from: 'kategoris',
                localField: 'IDKATEGORI',
                foreignField: 'IDKATEGORI',
                as: 'KATEGORI_DATA'
            },
        },
        {
            $unwind: {
                path: '$KATEGORI_DATA',
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'IDUSER',
                foreignField: 'IDUSER',
                as: 'USER_DATA'
            }
        }, {
            $unwind: {
                path: '$USER_DATA'
            }
        }
    ])
}

const getAllByUser = async ({ IDUSER }) => {
    const checkUser = await model.find({ IDUSER: IDUSER })
    if (checkUser.length === 0) {
        response = { ...requestResponse.unauthorized }
        console.log('USER TIDAK MEMILIKI PRODUK')
        response.message = 'USER TIDAK MEMILIKI PRODUK'
    }
    return model.aggregate([
        { $match: { $and: [{ IDUSER: IDUSER }] } },
        {
            $lookup: {
                from: 'kategoris',
                localField: 'IDKATEGORI',
                foreignField: 'IDKATEGORI',
                as: 'KATEGORI_DATA'
            },
        }, {
            $unwind: { path: '$KATEGORI_DATA' }
        }, {
            $lookup: {
                from: 'users',
                localField: 'IDUSER',
                foreignField: 'IDUSER',
                as: 'USER_DATA'
            }
        }, {
            $unwind: {
                path: '$USER_DATA'
            }
        }
    ])
}

const getAllByKategori = async ({ IDKATEGORI }) => {
    const checkUser = await model.find({ IDKATEGORI: IDKATEGORI })
    if (checkUser.length === 0) {
        response = { ...requestResponse.unauthorized }
        console.log('PRODUK TIDAK ADA')
        response.message = 'PRODUK TIDAK ADA'
    }
    return model.aggregate([
        { $match: { $and: [{ IDKATEGORI: IDKATEGORI }] } },
        {
            $lookup: {
                from: 'kategoris',
                localField: 'IDKATEGORI',
                foreignField: 'IDKATEGORI',
                as: 'KATEGORI_DATA'
            },
        }, {
            $unwind: { path: '$KATEGORI_DATA' }
        }, {
            $lookup: {
                from: 'users',
                localField: 'IDUSER',
                foreignField: 'IDUSER',
                as: 'USER_DATA'
            }
        }, {
            $unwind: {
                path: '$USER_DATA'
            }
        }
    ])
}

const getById = async (condition) => {
    return model.findOne(condition)
}

const updateOne = async (condition, body) => {
    return model.updateOne(condition, body)
}

const deleteOne = (condition) => {
    return model.deleteOne(condition)
}

module.exports = {
    create,
    getAll,
    getAllByUser,
    getAllByKategori,
    updateOne,
    getById,
    deleteOne
}