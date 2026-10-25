const express = require('express');
const router =  express.Router();
const {obtenerMenu} = require("../controllers/reservaController");

// Definimos nuestras rutas
router.get('/menu', obtenerMenu);

module.exports = router;