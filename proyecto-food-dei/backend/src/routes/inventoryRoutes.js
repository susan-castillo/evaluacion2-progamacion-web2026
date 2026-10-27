const express = require('express');
const router = express.Router();
const { obtenerInventario, obtenerReserva, agregarAReserva, actualizarPorciones } = require("../controllers/inventoryController");

// Definimos nuestras rutas
router.get('/menu', obtenerInventario);
router.get('/reserva', obtenerReserva);
router.post('/reserva/agregar', agregarAReserva);
router.put('/reserva/actualizar-porciones/:id', actualizarPorciones);

module.exports = router;