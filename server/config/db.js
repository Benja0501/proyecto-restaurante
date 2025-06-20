// server/config/db.js
const mongoose = require("mongoose");
//require("dotenv").config({ path: "../.env" }); 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado exitosamente");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1); // Detiene la aplicación si no se puede conectar a la BD
    }
};

module.exports = connectDB;
