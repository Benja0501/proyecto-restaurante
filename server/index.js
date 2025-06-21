// server/index.js
require('dotenv').config();
// 1. Importar las librerías
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

// Conectar a la base de datos
connectDB();

// 2. Inicializar la aplicación de Express
const app = express();

// 3. Definir el puerto. Usaremos uno diferente al de React (que es 3000)
const PORT = process.env.PORT || 5001;

// 4. Configurar los Middlewares
app.use(cors()); // Permite las solicitudes de otros orígenes (nuestro frontend)
app.use(express.json()); // Permite al servidor entender peticiones con cuerpo en formato JSON

// 5. Definir una ruta de prueba
// Cuando alguien visite la raíz de nuestra API (http://localhost:5001/)
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de El Sazón de la Abuela" });
});

// Rutas de la API
app.use('/api/platillos', require('./routes/platillos'));
app.use('/api/users', require('./routes/users'));

// 6. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
