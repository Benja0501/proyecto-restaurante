// client/src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css'; // Reutilizamos los mismos estilos del otro formulario

function RegisterPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // La única diferencia principal en la llamada: la URL
        const response = await fetch('http://localhost:5001/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            // El backend nos puede devolver un mensaje específico (ej: "El usuario ya existe")
            throw new Error(data.message || 'Error al registrar el usuario');
        }

        // Si el registro es exitoso, informamos al usuario y lo enviamos a la página de login
        alert('¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.');
        navigate('/login');

        } catch (error) {
        alert(error.message);
        }
    };

    return (
        <div className="form-container">
        <h2>Registrar Nuevo Usuario</h2>
        <p>Crea una cuenta de administrador para gestionar el restaurante.</p>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" minLength="6" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-btn">Registrar</button>
        </form>
        </div>
    );
}

export default RegisterPage;