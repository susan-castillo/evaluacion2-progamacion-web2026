//Importacion de modulos necesarios
const { inventario, reserva, calcularTotal } = require('../utils/dataInventory');

//----- ENDPOINTS
// Endpoint 1: GET /api/menu
const obtenerInventario = (req, res) => {
    res.json(inventario);
};

// Endpoint 2: GET /api/reserva
const obtenerReserva = (req, res) => {
    res.json(reserva);
};

// Endpoint 3: POST /api/reserva/agregar
// Recibe { alimentoId, cantidad } y agrega temporalmente el plato a la reserva
const agregarAReserva = (req, res) => {
    const { alimentoId, cantidad } = req.body || {};
    const id = Number(alimentoId);
    const cant = Number(cantidad);

    if (!Number.isInteger(id) || !Number.isInteger(cant) || cant <= 0) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    const plato = inventario.find(p => p.id === id);
    if (!plato) {
        return res.status(404).json({ error: "Alimento no encontrado" });
    }

    // Se considera lo que ya está en la reserva para no sobrepasar el stock
    const itemExistente = reserva.itemsReservados.find(i => i.id === id);
    const yaReservado = itemExistente ? itemExistente.cantidad : 0;

    // Como el stock ya se descuenta al agregar, plato.stock es lo que queda disponible
    // (por eso ya no hace falta sumar lo que hay en la reserva)
    if (plato.stock < cant) {
        return res.status(400).json({ error: "Stock insuficiente" });
    }

    // El total de la reserva con este plato no puede superar el saldo (el saldo restante nunca baja de 0)
    const nuevoTotal = Number((calcularTotal() + plato.precio * cant).toFixed(2));
    if (nuevoTotal > reserva.saldo) {
        return res.status(400).json({ error: "Saldo insuficiente" });
    }

    if (itemExistente) {
        itemExistente.cantidad += cant;
    } else {
        reserva.itemsReservados.push({ id, cantidad: cant });
    }
    
    // Se descuenta el stock al agregar a la reserva, para que el DELETE y el PUT
    // puedan devolver las unidades al stock del menú sin que este se infle
    plato.stock -= cant;

    reserva.total = Number(calcularTotal().toFixed(2));

    res.json(reserva);
};

// Exportamos nuestras funciones para que puedan ser utilizadas en otros archivos
module.exports = {
    obtenerInventario,
    obtenerReserva,
    agregarAReserva
};