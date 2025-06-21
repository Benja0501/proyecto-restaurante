import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch('http://localhost:5001/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar sesión');
        }
        // Si el login es exitoso, guarda el token en el almacenamiento local del navegador
        localStorage.setItem('token', data.token);
        alert('¡Login exitoso!');
        navigate('/'); // Redirige a la página de inicio
        } catch (error) {
        alert(error.message);
        }
    };

    return (
        <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-btn">Entrar</button>
        </form>
        </div>
    );
}
export default LoginPage;