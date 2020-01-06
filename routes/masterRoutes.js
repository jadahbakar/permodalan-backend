var express = require('express')
var router = express.Router()

var masterController = require('../controllers/masterController')

router.get('/kabkota', masterController.getKabupatenKota)
router.get('/kabkota/:id', masterController.getKabupatenKotaDetail)
router.put('/kabkota/:id', masterController.putKabupatenKotaEdit)

router.get('/wilayah/', masterController.getWilayah)
router.get('/wilayah/:id', masterController.getWilayahDetail)
router.get('/wilayah/cabang/:wilayah', masterController.getWilayahCabang)

router.get('/cabang/', masterController.getCabang)
router.get('/cabang/:id', masterController.getCabangDetail)
router.put('/cabang/:id', masterController.putKabupatenKotaEdit)

router.get('/rups/', masterController.getRUPS)
router.get('/rups/:tanggal', masterController.getRUPSDetail)
router.post('/rups', masterController.postRUPS)
router.put('/rups/:tanggal', masterController.putRUPS)
router.delete('/rups/:tanggal', masterController.delRUPS)

router.get('/setor/', masterController.getSetor)
router.get('/setor/:tanggal', masterController.getSetorDetail)
router.post('/setor', masterController.postSetor)
router.put('/setor/:tanggal', masterController.putSetor)
router.delete('/setor/:tanggal', masterController.delSetor)

module.exports = router
