require("dotenv").config();
const service = require("../services/setTanam_services");
const logger = require("../utils/logger");
const { requestResponse } = require("../utils/index");
const { v4, validate: isUuid } = require("uuid");

let response;

const create = async (req, res) => {
  try {
    req.body.GUID = v4();
    const data = await service.create(req.body);
    response = { ...data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getAll = async (req, res) => {
  try {
    const data = await service.getAll(req.body);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getAllByUser = async (req, res) => {
  try {
    const data = await service.getAllByUser({ IDUSER: req.params.id });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getById = async (req, res) => {
  try {
    const data = await service.getById({ GUID: req.params.id });
    console.log(data)
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const updateOne = async (req, res) => {
  try {
    const data = await service.updateOne({ GUID: req.params.id }, req.body);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const deleteOne = async (req, res) => {
  try {
    const data = await service.deleteOne({ GUID: req.params.id });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getCount = async (req, res) => {
  try {
    const data = await service.getCount();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getCountUser = async (req, res) => {
  try {
    const data = await service.getCount({ IDUSER: req.params.id });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

// const getCountOn = async (req, res) => {
//     try {
//         const data = await service.getCountOn({ STATUS: req.params.id })
//         response = { ...requestResponse.success, data }
//     } catch (error) {
//         logger.error(error)
//         response = { ...requestResponse.server_error }
//     }
// }

module.exports = {
  create,
  getAll,
  getAllByUser,
  getById,
  updateOne,
  deleteOne,
  getCount,
  getCountUser,
};
