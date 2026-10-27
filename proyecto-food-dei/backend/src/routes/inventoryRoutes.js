const express = require('express');
const router = express.Router();
const { obtenerInventario, obtenerReserva, agregarAReserva, actualizarPorciones, eliminarDeReserva } = require("../controllers/inventoryController");

// Definimos nuestras rutas
router.get('/menu', obtenerInventario);
router.get('/reserva', obtenerReserva);
router.post('/reserva/agregar', agregarAReserva);
router.put('/reserva/actualizar-porciones/:id', actualizarPorciones);
router.delete('/reserva/eliminar/:id', eliminarDeReserva);

module.exports = router;