// Este es nuestro "falso" backend por ahora
import lomoSaltadoImg from './assets/images/lomo_saltado.jpg';
import ajiDeGallinaImg from './assets/images/aji_gallina.jpg';
import cevicheImg from './assets/images/ceviche.jpg';

export const menuItems = [
    {
        id: 1,
        nombre: "Lomo Saltado",
        descripcion:
        "Trozos de carne de res salteados con cebolla, tomate y papas fritas.",
        precio: 35.0,
        imagen: lomoSaltadoImg,
    },
    {
        id: 2,
        nombre: "Aji de Gallina",
        descripcion:
        "Pechuga de gallina desmenuzada en una cremosa salsa de ají amarillo.",
        precio: 30.0,
        imagen: ajiDeGallinaImg,
    },
    {
        id: 3,
        nombre: "Ceviche Clásico",
        descripcion:
        "Pescado fresco marinado en jugo de limón, con cebolla roja, ají y camote.",
        precio: 40.0,
        imagen: cevicheImg,
    },
];
