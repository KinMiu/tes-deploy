const model = require("../model/setDataAlat");
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
        foreignField: "GUID",
        as: "USERS_DATA",
      },
    },
    {
      $lookup: {
        from: "alats",
        localField: "IDALAT",
        foreignField: "GUID",
        as: "USERS_DATA",
      },
    },
  ]);
};

const getAllByID = async (MAC) => {
  const MAC_ADDRESS = MAC.MAC_ADDRESS
  return model.aggregate([
    {
      $match: {
        $and: [{ MAC_ADDRESS: MAC_ADDRESS }],
      },
    },
    {
      $lookup: {
        from: "alats",
        localField: "MAC_ADDRESS",
        foreignField: "MAC_ADDRESS",
        as: "DATA_ALAT",
      },
    },
    {
      $lookup: {
        from: "alats",
        localField: "IDALAT",
        foreignField: "GUID",
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

module.exports = {
  create,
  getAll,
  getAllByUser,
  getAllByID,
  updateOne,
  getById,
  deleteOne,
  getCount,
};
