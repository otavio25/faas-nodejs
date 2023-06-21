const express = require('express')
const controller = require('../controller/controller')
const router = express('router')

router.get("/aws", controller.get_list_papers_aws)
router.get("/google", controller.get_list_papers_google)
// router.get("/microsoft", controller.get_list_papers_microsoft)

module.exports = router