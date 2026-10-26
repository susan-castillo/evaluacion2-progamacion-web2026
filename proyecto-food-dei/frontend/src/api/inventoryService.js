const API_BASE_INVENTARIO = "http://localhost:5000/api/inventario";

// Solicitud de información del menú al backend


// Solicitud de información de la reserva al backend
export const getReserva = async () => {
    const res = await fetch(`${API_BASE_INVENTARIO}/reserva`);
    return res.json();
};