const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const formRoutes = require("./routes/formRoutes")
const adminRoutes = require("./routes/adminRoutes")
const dotenv = require("dotenv")
const path = require("path")
const app = express()
const cors = require("cors")

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "50mb" })) // Augmenter la limite de taille du payload à 50 MB

const dbUrl = process.env.DB_URL_PROD

// MongoDB connection
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database")
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + (process.env.PORT || 3000))
    })
  })
  .catch((err) => {
    console.log(err)
  })

app.use(
  cors({
    origin: process.env.URL_CLIENT, // Assurez-vous que cette variable d'environnement est correctement configurée
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS"],
    credentials: true,
  })
)

// Routes
app.use("/api/forms", formRoutes)
app.use("/api/admin", adminRoutes)

// Serveur les fichiers statiques depuis le dossier dist
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "users_files")))

// Si une requête ne correspond à aucune route, renvoyer index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
})
