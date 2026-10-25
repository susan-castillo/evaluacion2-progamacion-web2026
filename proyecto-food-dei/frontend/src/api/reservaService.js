const API_BASE = "http://localhost:5000/api";

// Solicitud de información del menú al backend
export const getMenu = async () => {
    const res = await fetch(`${API_BASE}/menu`);
    return res.json();
};

// Solicitud de información de la reserva al backend
export const getReserva = async () => {
    const res = await fetch(`${API_BASE}/reserva`);
    return res.json();
};