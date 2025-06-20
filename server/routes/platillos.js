// server/routes/platillos.js
const express = require("express");
const router = express.Router();
const Platillo = require("../models/Platillo"); // Importamos el modelo

// Ruta para obtener todos los platillos
// GET /api/platillos
router.get("/", async (req, res) => {
    try {
        const platillos = await Platillo.find();
        res.json(platillos);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = router;
