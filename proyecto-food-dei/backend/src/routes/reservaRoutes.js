const express = require('express');
const router =  express.Router();
const {obtenerMenu, obtenerReserva} = require("../controllers/reservaController");

// Definimos nuestras rutas

router.get('/reserva', obtenerReserva);

module.exports = router;