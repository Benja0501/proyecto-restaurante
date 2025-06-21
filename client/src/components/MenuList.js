import React from "react";
import MenuItem from "./MenuItem";

function MenuList({ platillos , onPlatilloDeleted}) {
    return (
        <main>
        <h2>Nuestro Menú</h2>
        {/* Aquí irán los platillos */}
        <div className="menu-container">
            {platillos.map((platillo) => (
            // 2. Ahora es mucho más limpio. Le pasamos cada platillo al componente MenuItem
            <MenuItem key={platillo._id} platillo={platillo} onPlatilloDeleted={onPlatilloDeleted} />
            ))}
        </div>
        </main>
    );
}

export default MenuList;
