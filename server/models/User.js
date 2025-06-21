// server/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // No puede haber dos usuarios con el mismo email
    },
    password: {
        type: String,
        required: true,
    },
    });

    // Middleware para hashear la contraseña ANTES de guardarla en la BD
    UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);
