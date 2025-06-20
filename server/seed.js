// server/seed.js
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Platillo = require("./models/Platillo");
const { menuItems } = require("../client/src/data"); // Importamos los datos del frontend

// Conectamos a la base de datos
connectDB();

const importData = async () => {
    try {
        // 1. Borramos todos los datos existentes para evitar duplicados
        await Platillo.deleteMany();
        console.log("Datos antiguos eliminados...");

        // 2. Insertamos los nuevos datos de nuestro archivo
        await Platillo.insertMany(menuItems);
        console.log("¡Datos importados exitosamente!");
        process.exit();
    } catch (error) {
        console.error("Error al importar datos:", error);
        process.exit(1);
    }
};

// Llamamos a la función
importData();
