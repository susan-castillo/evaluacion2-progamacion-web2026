const express = require('express');
const router = express.Router();
const { obtenerMenu, obtenerReserva, agregarAReserva } = require("../controllers/inventoryController");

// Definimos nuestras rutas
router.get('/menu', obtenerMenu);
router.get('/reserva', obtenerReserva);
router.post('/reserva/agregar', agregarAReserva);

module.exports = router;