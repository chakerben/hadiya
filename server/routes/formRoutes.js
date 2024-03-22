const express = require("express")
const router = express.Router()
const formController = require("../controllers/formController")

// Routes
router.post("/", formController.submitForm)

module.exports = router
