const express = require('express')
const router = express.Router()
const controller = require('../controller/controller_produk')
const { upload, cekNull, requestResponse } = require('../utils/index')

const fields = upload.fields([
    {
        name: 'GAMBAR',
        maxCount: 1
    }
])

router.post('/input', fields, (req, res) => {
    const imageName = cekNull(req.files['GAMBAR'])
    const data = Object.assign(req.body, {
        GAMBAR: imageName
    })
    controller.create(data)
        .then((result) => {
            res.json(result)
        }).catch((error) => {
            res.json(error)
        })
})
// router.post('/input', controller.create)
router.get('/get', controller.getAll)
router.get('/get/:id', controller.getById)
router.get('/get/user/:id', controller.getAllByUser)
router.get('/get/kategori/:id', controller.getAllByKategori)

router.put('/edit/:id', fields, (req, res) => {
    const imageName = cekNull(req.files['GAMBAR'])
    console.log(imageName)
    const data = req.body
    console.log(data)
    // console.log(data)
    let changeImage = false
    if (imageName) {
        changeImage = true
        data = Object.assign(data, {
            GAMBAR: imageName,
            GAMBAR_LAMA: data.GAMBAR
        })
        console.log(data)
    }
    console.log(data)

    controller.updateOne(data, req.params.id, changeImage)
        .then((result) => {
            res.json(result)
        }).catch((error) => {
            res.json(error)
        })
})

router.delete('/delete/:id', controller.deleteOne)

module.exports = router