const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


router.post("/login",userController.loginForm)
router.post("/register",userController.register)



module.exports = router