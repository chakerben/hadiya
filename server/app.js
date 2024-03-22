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
const dbUrl = process.env.DB_URL_PROD

// MongoDB connection
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to the database")
    app.listen(3000)
    console.log("listening on port 3000")
  })
  .catch((err) => {
    console.log(err)
  })
app.use(
  cors({
    origin: process.env.URL_CLIENT,
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS"],
    credentials: true,
  })
)
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  next()
})
// Routes
app.use("/api/forms", formRoutes)
app.use("/api/admin", adminRoutes)
app.use(express.static("dist"))
app.use(express.static("users_files"))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
})
