const API_BASE_INVENTARIO = "http://localhost:5000/api";

// Solicitud de información del menú al backend
export const getMenu = async () => {
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