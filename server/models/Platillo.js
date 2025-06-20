// server/models/Platillo.js
const mongoose = require("mongoose");

const PlatilloSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
});

module.exports = mongoose.model("Platillo", PlatilloSchema);
