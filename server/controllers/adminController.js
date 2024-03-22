const User = require("../models/User")
// Importer le modèle ou la logique de gestion des données pour les demandes
const Order = require("../models/Order")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." })
    }

    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    })

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Méthode pour récupérer toutes les demandes
exports.getOrder = async (req, res) => {
  try {
    // Récupérer toutes les demandes depuis la source de données
    const orders = await Order.find().sort({ creationDate: -1 })
    // Renvoyer les demandes en tant que réponse
    res.json(orders)
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un code d'erreur
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération des demandes.",
    })
  }
}

exports.uploadPhoto = async (req, res) => {
  try {
    // Récupérer les données de l'image depuis la requête
    const imageData = req.body.imageData
    const orderId = req.body.orderId

    // Extraire le type d'image (jpeg, png, etc.)
    const matches = imageData.match(/^data:image\/([A-Za-z]+);base64,(.+)$/)
    const imageType = matches[1]
    const base64Data = matches[2]

    // Enregistrer l'image sur le serveur avec un nom unique
    const photoName = `photo_${orderId}_${Date.now()}.${imageType}`
    const photoPath = path.join(__dirname, "..", "users_files", photoName)

    fs.writeFileSync(photoPath, base64Data, "base64")

    // Retourner l'URL de l'image enregistrée
    const imageUrl = `${process.env.URL_CLIENT}/api/admin/picture/${orderId}`
    const order = await Order.findByIdAndUpdate(orderId, {
      urlPicture: photoName,
    })
    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la photo :", error)
    res.status(500).json({
      message: "Une erreur est survenue lors de l'enregistrement de la photo.",
    })
  }
}
module.exports.getUserPictures = async (req, res) => {
  const pictureId = req.params.pictureId
  try {
    if (pictureId) {
      const order = await Order.findById(pictureId)
      const filePath = path.resolve(__dirname, "..", "users_files")
      const file = filePath + "/" + order?.urlPicture
      const exists = require("fs").existsSync(file)
      if (exists) {
        const imageContent = require("fs").readFileSync(file)
        // Envoyer le contenu de l'image en réponse avec le type de contenu approprié
        res.writeHead(200, { "Content-Type": "image/jpeg" })
        res.end(imageContent, "binary")
      } else {
        res.status(404).send("Picture not found")
      }
    } else {
      res.status(404).send("Order not found")
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier :", error)
    res.status(500).send("Erreur serveur", error?.message)
  }
}
