const express = require('express')
const controller = require('../controller/controller')
const router = express('router')

router.get("/aws", controller.getListPapersAws)
router.get("/google", controller.getListPapersGoogle)
router.get("/azure", controller.getListPapersAzure)
router.get("/digitalocean", controller.getListPapersDigitalocean)

module.exports = router