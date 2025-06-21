// client/src/pages/EditPlatilloPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Formulario.css';

function EditPlatilloPage() {
    const { id } = useParams(); // Hook para leer el :id de la URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: '', imagen: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlatillo = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/platillos/${id}`);
            if (!response.ok) throw new Error('Platillo no encontrado');
            const data = await response.json();
            setFormData(data); // Rellenamos el formulario con los datos existentes
        } catch (error) {
            console.error(error);
            alert(error.message);
            navigate('/menu');
        } finally {
            setLoading(false);
        }
        };
        fetchPlatillo();
    }, [id, navigate]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
        const response = await fetch(`http://localhost:5001/api/platillos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Error al actualizar el platillo');
        alert('Platillo actualizado exitosamente');
        navigate('/menu');
        } catch (error) {
        alert(error.message);
        }
    };

    if (loading) return <p>Cargando datos del platillo...</p>;

    return (
        <div className="form-container">
        <h2>Editar Platillo</h2>
        <form onSubmit={handleSubmit}>
            {/* El formulario es idéntico al de Añadir Platillo */}
            {/* ... pega aquí los 4 div.form-group del archivo AddPlatilloPage.js ... */}
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
            <button type="submit" className="submit-btn" style={{backgroundColor: '#007bff'}}>Actualizar Cambios</button>
        </form>
        </div>
    );
}
export default EditPlatilloPage;