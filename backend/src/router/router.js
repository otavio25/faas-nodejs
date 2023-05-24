const express = require('express')
const controller = require('../controller/controller')
const router = express('router')

router.get("/check", controller.get_list_papers)

module.exports = router