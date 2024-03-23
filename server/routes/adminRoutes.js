const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "users_files/")
  },
  filename: function (req, file, cb) {
    // Obtenir l'extension du fichier d'origine
    const ext = path.extname(file.originalname)

    // Générer un nom de fichier unique avec un horodatage
    cb(null, `${file.fieldname}-${Date.now()}${ext}`)
  },
})

const upload = multer({ storage: storage })

router.post(
  "/uploadPhoto",
  upload.single("imageData"),
  adminController.uploadPhoto
)
// Routes
router.post("/login", adminController.login)
router.get("/requests", adminController.getOrder)
router.get("/picture/:pictureId", adminController.getUserPictures)

module.exports = router
