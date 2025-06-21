// server/routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Ruta para REGISTRAR un nuevo usuario
// POST /api/users/register
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
        return res.status(400).json({ message: "El usuario ya existe." });
        }
        user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
        res.status(500).send("Error en el servidor.");
    }
});

// Ruta para INICIAR SESIÓN (LOGIN)
// POST /api/users/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: "Credenciales inválidas." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "Credenciales inválidas." });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "5h" }, // El token expira en 5 horas
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
        );
    } catch (error) {
        res.status(500).send("Error en el servidor.");
    }
});

module.exports = router;
