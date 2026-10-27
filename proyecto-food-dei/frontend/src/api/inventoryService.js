const API_BASE_INVENTARIO = "http://localhost:5000/api/reserva";

// Solicitud de información del inventario al backend
export const getInventario = async () => {
    const res = await fetch(`${API_BASE_INVENTARIO}/menu`);
    return res.json();
};

// Solicitud de información de la reserva al backend
export const getReserva = async () => {
    const res = await fetch(`${API_BASE_INVENTARIO}/reserva`);
    return res.json();
};

// Agrega un plato a la reserva. Si el backend responde con error, lanza una excepción con su mensaje
export const agregarAReserva = async (alimentoId, cantidad) => {
    const res = await fetch(`${API_BASE_INVENTARIO}/reserva/agregar`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({alimentoId, cantidad})
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Error al agregar a la reserva');
    }
    return data;
};

// Cambia la cantidad de porciones de un plato en la reserva. Si el backend responde con error, lanza una excepción con su mensaje
export const actualizarPorciones = async (id, cantidad) => {
    const res = await fetch(`${API_BASE_INVENTARIO}/reserva/actualizar-porciones/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cantidad})
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Error al actualizar las porciones');
    }
    return data;
};

// Elimina un plato completo de la reserva. Si el backend responde con error, lanza una excepción con su mensaje
export const eliminarDeReserva = async (id) => {
    const res = await fetch(`${API_BASE_INVENTARIO}/reserva/eliminar/${id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Error al eliminar de la reserva');
    }
    return data;
};