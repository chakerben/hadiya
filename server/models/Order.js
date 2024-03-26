const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  urlPicture: { type: String },
  creationDate: { type: Date, default: Date.now }, // Création de la date par défaut
  sendDate: { type: Date },
})

module.exports = mongoose.model("Order", orderSchema)
