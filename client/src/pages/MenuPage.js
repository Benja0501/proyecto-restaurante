import React, { useState, useEffect } from "react";
import MenuList from "../components/MenuList"; // Ojo con la ruta: ../components/

function MenuPage() {
  // 2. Crea un estado para guardar los platillos y otro para el estado de carga
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchPlatillos = async () => {
      try {
        // 4. Llama a tu API de backend
        const response = await fetch("http://localhost:5001/api/platillos");
        const data = await response.json();
        setPlatillos(data); // Guarda los datos en el estado
      } catch (error) {
        console.error("Error al obtener los platillos:", error);
      } finally {
        setLoading(false); // Termina la carga, ya sea con éxito o error
      }
    };

    fetchPlatillos();
  }, []); // El array vacío [] significa que este efecto se ejecuta solo una vez

  // --- NUEVA FUNCIÓN ---
  // Esta función se llamará desde el componente hijo para actualizar el estado
  const handlePlatilloDeleted = (deletedPlatilloId) => {
    // Filtramos la lista de platillos, quedándonos solo con los que NO tienen el ID eliminado
    setPlatillos(platillos.filter(p => p._id !== deletedPlatilloId));
  };
  // --- FIN DE LA NUEVA FUNCIÓN ---
  // 5. Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <h2>Cargando menú...</h2>;
  }

  // 6. Pasa los platillos obtenidos del estado al componente MenuList
  return <MenuList platillos={platillos} onPlatilloDeleted={handlePlatilloDeleted} />;
}

export default MenuPage;
