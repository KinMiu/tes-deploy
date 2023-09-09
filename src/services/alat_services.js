const model = require('../model/alat')
const { requestResponse } = require('../utils/index')

let response

const create = async (data) => {
    const checkData = await model.findOne({ NAMA_ALAT: data.NAMA_ALAT }, { _id: false }, { lean: true })
    if (checkData !== undefined && checkData !== null) {
        response = { ...requestResponse.unprocessable_entity }
        response.message = 'ALAT TELAH TERDAFTAR'
        return response
    }
    await model.create(data)
    return { ...requestResponse.success }
}

const getAll = async (condition) => {
    return model.aggregate([
        {
            $match: {
                $and: [condition]
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'IDUSER',
                foreignField: 'IDUSER',
                as: 'USER_DATA'
            },
        },
    ])
}

const getAllByUser = async ({ IDUSER }) => {
    const checkUser = await model.find({ IDUSER: IDUSER })
    if (checkUser.length === 0) {
        response = { ...requestResponse.unauthorized }
        console.log('ID TIDAK TERDAFTAR')
        response.message = 'ID Tidak terdaftar'
    }
    return model.aggregate([
        {
            $match: {
                $and: [{ IDUSER: IDUSER }]
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'IDUSER',
                foreignField: 'IDUSER',
                as: 'USERS_DATA'
            },
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

const aktivasiAlat = async (data) => {
    const checkID = await model.findOne({ MAC_ADDRESS: data.MAC_ADDRESS })
    console.log(checkID)
    if (checkID === null) {
        response = { ...requestResponse.unauthorized }
        response.message = 'ID Tidak terdaftar'
        return response
    }
    const update = await model.updateOne({ MAC_ADDRESS: data.MAC_ADDRESS }, {
        $set: {
            STATUS: 2,
            IDUSER: data.IDUSER
        }
    })

    const result = {
        ...requestResponse.success, update
    }

    return result
}

const nonAktif = async (condition) => {
    const update = await model.updateOne({ MAC_ADDRESS: condition }, {
        $set: {
            STATUS: 1,
            IDUSER: '-'
        }
    })
    const result = {
        ...requestResponse.success, update
    }
    return result
}

const getCount = (condition) => {
    return model.countDocuments(condition)
}

// const getCountOn = ({STATUS}) => {
//     const cekStatus = model.countDocuments({ STATUS: STATUS })
//     if (cekStatus == null) {
//         response = { ...requestResponse.unauthorized }
//         response.message = 'ALAT TIDAK ADA'
//     }
//     const count = model.countDocuments({ STATUS: STATUS })

//     return count
// }

module.exports = {
    create,
    getAll,
    getAllByUser,
    updateOne,
    getById,
    deleteOne,
    aktivasiAlat,
    nonAktif,
    getCount,
    // getCountOn
}