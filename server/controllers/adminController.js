const User = require("../models/User")
// Importer le modèle ou la logique de gestion des données pour les demandes
const Order = require("../models/Order")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")
const AWS = require("aws-sdk")

// Configurez l'accès à S3 avec vos clés d'accès

exports.uploadPhoto = async (req, res) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, // Remplacez par la région où se trouve votre compartiment S3
  })
  try {
    const file = req.file // Récupérer le fichier à partir du champ 'imageData'
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier téléchargé" })
    }

    const orderId = req.body.orderId
    // Générer un nom de fichier unique
    const timestamp = Date.now() // Timestamp actuel
    const randomString = Math.random().toString(36).substring(2, 15) // Chaîne aléatoire
    const fileType = file.mimetype.split("/")[1]
    const fileName = `photo_${timestamp}_${randomString}.${fileType}`
    // Utiliser le nom de fichier généré dans les paramètres S3
    const s3 = new AWS.S3()
    const s3Params = {
      Bucket: "maabada",
      Key: `users_files/${fileName}`, // Utilisation du nom de fichier généré
      Body: file.buffer, // Les données binaires du fichier à téléverser
      ContentType: fileType,
      ACL: "public-read",
    }
    // Téléverser le fichier vers S3
    await s3.upload(s3Params).promise()

    // Construisez l'URL de l'image à partir de l'URI S3
    const imageUrl = `https://maabada.s3.eu-north-1.amazonaws.com/users_files/${fileName}`

    // Mettre à jour l'ordre avec l'URL de l'image
    await Order.findByIdAndUpdate(orderId, { urlPicture: imageUrl })

    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement de la photo :",
      error.message
    )
    res.status(500).json({
      message: `Une erreur est survenue lors de l'enregistrement de la photo. ${error.message}`,
    })
  }
}
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
    const orders = await Order.find().sort({ creationDate: 1 })
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
exports.updateSendDate = async (req, res) => {
  try {
    const idOrder = req.params.idOrder
    await Order.findByIdAndUpdate(idOrder, { sendDate: new Date() })
    res.status(200).json({ success: true })
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un code d'erreur
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise a jour.",
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
      console.log("file", file, exists)
      if (exists) {
        const ext = path.extname(file)
        let contentType = ""
        switch (ext) {
          case ".jpg":
          case ".jpeg":
            contentType = "image/jpeg"
            break
          case ".png":
            contentType = "image/png"
            break
          case ".gif":
            contentType = "image/gif"
            break
          default:
            contentType = "application/octet-stream"
        }

        const imageContent = require("fs").readFileSync(file)
        // Envoyer le contenu de l'image en réponse avec le type de contenu approprié
        res.writeHead(200, { "Content-Type": contentType })
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
