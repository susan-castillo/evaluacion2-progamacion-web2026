//Importacion de modulos necesarios
const { inventario, reserva, calcularTotal} = require('../utils/data');

//----- ENDPOINTS
//Endpoint 1: GET /api/menu
const obtenerMenu = (req, res) => {
    res.json(inventario)
}

// Endpoint 2: GET /api/reserva[cite: 2]
const obtenerReserva = (req, res) => {
    res.json(reserva);
};

// Exportamos nuestras funciones y objetos para que puedan ser utilizados en otros archivos
module.exports = {
    obtenerMenu,
    obtenerReserva
};