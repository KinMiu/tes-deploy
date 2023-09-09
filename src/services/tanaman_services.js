const model = require("../model/tanaman");
const { requestResponse } = require("../utils/index");

let response;

const create = async (data) => {
  await model.create(data);
  return { ...requestResponse.success, data: model };
};

const getAll = async (condition) => {
  return model.find(condition, { _id: false }, { lean: true });
};

const getAllByUser = async ({ IDUSER }) => {
  const checkUser = await model.find({ IDUSER: IDUSER });
  if (checkUser.length === 0) {
    response = { ...requestResponse.unauthorized };
    console.log("ID TIDAK TERDAFTAR");
    response.message = "ID Tidak terdaftar";
  }
  return model.aggregate([
    {
      $match: {
        $and: [{ IDUSER: IDUSER }],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "IDUSER",
        foreignField: "IDUSER",
        as: "USERS_DATA",
      },
    },
  ]);
};

const getById = async (condition) => {
  return model.findOne(condition);
};

const updateOne = async (condition, body) => {
  return model.updateOne(condition, body);
};

const deleteOne = (condition) => {
  return model.deleteOne(condition);
};

const getCount = (condition) => {
  return model.countDocuments(condition);
};

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
  getCount,
  // getCountOn
};
