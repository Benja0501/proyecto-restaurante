// server/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Obtener el token del header
    const token = req.header('Authorization');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ message: 'No hay token, permiso denegado.' });
    }

    // Si hay token, verificarlo
    try {
        // El token viene como "Bearer <token>", lo separamos
        const tokenLimpio = token.split(' ')[1];
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'El token no es válido.' });
    }
};