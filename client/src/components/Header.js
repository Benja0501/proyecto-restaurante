import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Sesión cerrada.');
        navigate('/');
    };
    return (
        <header>
            <h1>El Sazón de la Abuela</h1>
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/menu">Menú</Link>
                {token && <Link to="/admin/add">Añadir Platillo</Link>} {/* Solo se muestra si hay token */}
                <Link to="/contacto">Contacto</Link>
                
                {/* Lógica condicional para los enlaces de autenticación */}
                {token ? (
                <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
                ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registrar</Link>
                </>
                )}
            </nav>
        </header>
    );
}

export default Header;
