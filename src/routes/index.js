const express = require("express");
const router = express.Router();
const auth = require("../controller/controller_auth");
const kategori = require("./kategori");
const produk = require("./produk");
const users = require("./users");
const alat = require("./alat");
const setAlat = require("./setAlat");
const setTanam = require("./setTanam");
const tanaman = require("./tanaman");

router.post("/user/login", auth.login);

router.use("/kategori", kategori);
router.use("/produk", produk);
router.use("/user", users);
router.use("/alat", alat);
router.use("/setalat", setAlat);
router.use("/settanam", setTanam);
router.use("/tanaman", tanaman);

module.exports = router;
