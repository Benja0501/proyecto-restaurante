// src/components/MenuItem.js
import React from "react";
import "./MenuItem.css";
import { Link } from 'react-router-dom';
// Recibimos la función en los props
function MenuItem({ platillo, onPlatilloDeleted }) {
    const token = localStorage.getItem("token"); // Verificamos si el admin está logueado

    const handleDelete = async () => {
        // Pedimos confirmación antes de una acción destructiva
        if (
        !window.confirm(
            `¿Estás seguro de que quieres eliminar "${platillo.nombre}"?`
        )
        ) {
        return;
        }

        try {
        const response = await fetch(
            `http://localhost:5001/api/platillos/${platillo._id}`,
            {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        if (!response.ok) {
            throw new Error("Error al eliminar el platillo.");
        }

        alert("Platillo eliminado.");
        // Llamamos a la función del componente padre para actualizar la UI
        onPlatilloDeleted(platillo._id);
        } catch (error) {
        console.error(error);
        alert(error.message);
        }
    };

    return (
        <div className="menu-item">
        <img
            src={platillo.imagen}
            alt={platillo.nombre}
            className="menu-item-image"
        />
        <div className="menu-item-content">
            <h3>{platillo.nombre}</h3>
            <p>{platillo.descripcion}</p>
            <span>Precio: S/ {platillo.precio.toFixed(2)}</span>
        </div>
        <div className="menu-item-content">
            {/* ... */}
            {/* --- NUEVO CÓDIGO --- */}
            {/* Mostramos los botones de admin solo si hay un token */}
            {token && (
            <div className="admin-buttons">
                <Link to={`/admin/edit/${platillo._id}`} className="edit-btn">Editar</Link>
                <button onClick={handleDelete} className="delete-btn">Eliminar</button>
            </div>
            )}
            {/* --- FIN DEL NUEVO CÓDIGO --- */}
        </div>
        </div>
    );
}

export default MenuItem;
