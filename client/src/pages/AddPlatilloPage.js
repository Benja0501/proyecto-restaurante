// client/src/pages/AddPlatilloPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import './Formulario.css'; // Crearemos este archivo para los estilos

function AddPlatilloPage() {
    // Hook para navegar programáticamente
    const navigate = useNavigate();

    // Estado para guardar los datos de cada campo del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: ''
    });

    // Función que se ejecuta cada vez que el usuario escribe en un input
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    // Función que se ejecuta cuando el usuario envía el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        try {
            const token = localStorage.getItem('token'); // <-- Obtén el token
            const response = await fetch('http://localhost:5001/api/platillos', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

        if (!response.ok) {
            throw new Error('Error al crear el platillo');
        }

        // Si todo fue bien, mostramos una alerta y redirigimos al menú
        alert('¡Platillo añadido exitosamente!');
        navigate('/menu');

        } catch (error) {
        console.error(error);
        alert('Hubo un error al añadir el platillo.');
        }
    };

    return (
        <div className="form-container">
        <h2>Añadir Nuevo Platillo</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="nombre">Nombre del Platillo</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input type="number" id="precio" name="precio" step="0.01" value={formData.precio} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="imagen">URL de la Imagen</label>
            <input type="text" id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-btn">Añadir Platillo</button>
        </form>
        </div>
    );
}

export default AddPlatilloPage;