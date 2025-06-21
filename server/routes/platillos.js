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

//Guardían
const auth = require('../middleware/auth');
// --- NUEVO CÓDIGO ---
// Ruta para CREAR un nuevo platillo
// POST /api/platillos
router.post("/", async (req, res) => {
    // El middleware express.json() nos permite acceder a los datos enviados en req.body
    const { nombre, descripcion, precio, imagen } = req.body;

    // Validación simple
    if (!nombre || !descripcion || !precio || !imagen) {
        return res
        .status(400)
        .json({ message: "Por favor, incluye todos los campos." });
    }

    try {
        // Creamos una nueva instancia del modelo Platillo
        const nuevoPlatillo = new Platillo({
        nombre,
        descripcion,
        precio,
        imagen,
        });

        // Guardamos el nuevo platillo en la base de datos
        const platilloGuardado = await nuevoPlatillo.save();

        // Respondemos con el platillo recién creado y un estado 201 (Created)
        res.status(201).json(platilloGuardado);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error en el servidor al crear el platillo." });
    }
});
// --- FIN DEL NUEVO CÓDIGO ---
// --- NUEVO CÓDIGO ---
// Ruta para ELIMINAR un platillo por su ID
// DELETE /api/platillos/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        // Buscamos el platillo por el ID que viene en la URL (req.params.id)
        const platillo = await Platillo.findById(req.params.id);

        if (!platillo) {
        return res.status(404).json({ message: 'Platillo no encontrado.' });
        }

        // Usamos el método remove() sobre el documento encontrado
        await platillo.remove();

        res.json({ message: 'Platillo eliminado exitosamente.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor.');
    }
});
// --- FIN DEL NUEVO CÓDIGO ---

module.exports = router;
