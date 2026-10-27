//Importacion de modulos necesarios
const {inventario, reserva, calcularTotal} = require('../utils/dataInventory');

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
    const {alimentoId, cantidad} = req.body || {};
    const id = Number(alimentoId);
    const cant = Number(cantidad);

    if (!Number.isInteger(id) || !Number.isInteger(cant) || cant <= 0) {
        return res.status(400).json({error: "Datos inválidos"});
    }

    const plato = inventario.find(p => p.id === id);
    if (!plato) {
        return res.status(404).json({error: "Alimento no encontrado"});
    }

    // Se considera lo que ya está en la reserva para no sobrepasar el stock
    const itemExistente = reserva.itemsReservados.find(i => i.id === id);
    const yaReservado = itemExistente ? itemExistente.cantidad : 0;

    // Como el stock ya se descuenta al agregar, plato.stock es lo que queda disponible
    // (por eso ya no hace falta sumar lo que hay en la reserva)
    if (plato.stock < cant) {
        return res.status(400).json({error: "Stock insuficiente"});
    }

    // El total de la reserva con este plato no puede superar el saldo (el saldo restante nunca baja de 0)
    const nuevoTotal = Number((calcularTotal() + plato.precio * cant).toFixed(2));
    if (nuevoTotal > reserva.saldo) {
        return res.status(400).json({error: "Saldo insuficiente"});
    }

    if (itemExistente) {
        itemExistente.cantidad += cant;
    } else {
        reserva.itemsReservados.push({id, cantidad: cant});
    }

    // Se descuenta el stock al agregar a la reserva, para que el DELETE y el PUT
    // puedan devolver las unidades al stock del menú sin que este se infle
    plato.stock -= cant;

    reserva.total = Number(calcularTotal().toFixed(2));

    res.json(reserva);
};

// Endpoint 4: PUT /api/reserva/actualizar-porciones/:id
// Recibe el id en la URL y { cantidad } (la NUEVA cantidad total) en el body
const actualizarPorciones = (req, res) => {
    const id = Number(req.params.id);
    const nuevaCantidad = Number(req.body?.cantidad);

    if (!Number.isInteger(id) || !Number.isInteger(nuevaCantidad) || nuevaCantidad < 0) {
        return res.status(400).json({error: "Datos inválidos"});
    }

    const plato = inventario.find(p => p.id === id);
    const item = reserva.itemsReservados.find(i => i.id === id);

    if (!plato || !item) {
        return res.status(404).json({error: "El alimento no está en la reserva"});
    }

    // diferencia > 0: el usuario sube porciones, diferencia < 0: las baja
    const diferencia = nuevaCantidad - item.cantidad;

    // Si sube porciones, debe haber stock suficiente para la diferencia
    if (diferencia > plato.stock) {
        return res.status(400).json({error: "Stock insuficiente"});
    }

    // Si sube porciones, el nuevo total no puede superar el saldo
    const nuevoTotal = Number((calcularTotal() + plato.precio * diferencia).toFixed(2));
    if (nuevoTotal > reserva.saldo) {
        return res.status(400).json({error: "Saldo insuficiente para esta cantidad"});
    }

    // Con todo validado, recién ahora se modifican los datos
    // Si sube, el stock baja; si baja, el stock se recupera
    plato.stock -= diferencia;

    if (nuevaCantidad === 0) {
        // Si bajó a 0, el plato sale de la reserva
        const indice = reserva.itemsReservados.findIndex(i => i.id === id);
        reserva.itemsReservados.splice(indice, 1);
    } else {
        item.cantidad = nuevaCantidad;
    }

    reserva.total = Number(calcularTotal().toFixed(2));

    res.json(reserva);
};

// Endpoint 5: DELETE /api/reserva/eliminar/:id
// Quita el plato completo de la reserva y devuelve sus unidades al stock del menú
const eliminarDeReserva = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "Id inválido"});
    }

    // findIndex devuelve la posición del item en la reserva, o -1 si no existe
    const indice = reserva.itemsReservados.findIndex(i => i.id === id);
    if (indice === -1) {
        return res.status(404).json({error: "El alimento no está en la reserva"});
    }

    // splice devuelve un arreglo con lo eliminado; lo desestructuramos para tomar el item
    const [itemEliminado] = reserva.itemsReservados.splice(indice, 1);

    // Se devuelven al stock las unidades que estaban reservadas
    const plato = inventario.find(p => p.id === id);
    if (plato) {
        plato.stock += itemEliminado.cantidad;
    }

    reserva.total = Number(calcularTotal().toFixed(2));

    res.json(reserva);
};

// Exportamos nuestras funciones para que puedan ser utilizadas en otros archivos
module.exports = {
    obtenerInventario,
    obtenerReserva,
    agregarAReserva,
    actualizarPorciones,
    eliminarDeReserva
};