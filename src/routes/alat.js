const express = require('express')
const router = express.Router()
const controller = require('../controller/controller_alat')

router.post('/input', controller.create)
router.get('/get', controller.getAll)
router.get('/getbyuser/:id', controller.getAllByUser)
router.get('/get/:id', controller.getById)
router.put('/edit/:id', controller.updateOne)
router.delete('/delete/:id', controller.deleteOne)
router.get('/count', controller.getCount)
router.put('/aktif', controller.aktivasiAlat)
router.put('/non/:id', controller.nonAktif)

module.exports = router