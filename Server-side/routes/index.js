const express = require('express')
const router = express()
const Controller = require('../controllers/index')
const authentication = require('../middlewares/authentication')

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.get("/product", Controller.getProducts)
router.get("/product/:id", Controller.getProductById)

module.exports = router