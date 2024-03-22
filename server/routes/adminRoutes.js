const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

// Routes
router.post("/login", adminController.login)
router.get("/requests", adminController.getOrder)
router.post("/uploadPhoto", adminController.uploadPhoto) // Nouvel endpoint pour le téléchargement de photos
router.get("/picture/:pictureId", adminController.getUserPictures)

module.exports = router
