const Order = require("../models/Order")

exports.submitForm = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body
    const form = new Order({ name, phoneNumber })
    await form.save()
    res.status(201).json({ message: "Form submitted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
