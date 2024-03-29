const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const multer = require("multer")

const upload = multer() // Créez une instance de multer

router.post(
  "/uploadPhoto",
  upload.single("imageData"),
  adminController.uploadPhoto
)
// Routes
router.post("/login", adminController.login)
router.get("/requests", adminController.getOrder)
router.post("/update-send-date/:idOrder/", adminController.updateSendDate)
router.get("/picture/:pictureId/:fileName", adminController.getUserPictures)

module.exports = router
