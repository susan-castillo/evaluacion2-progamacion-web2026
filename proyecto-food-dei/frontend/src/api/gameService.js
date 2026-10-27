const API_URL = 'http://localhost:5000/api/juego';

export const enviarIntento = async (numero) => {
    const respuesta = await fetch(`${API_URL}/guess`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({numero})
    });
    return await respuesta.json();
};

export const reiniciarJuego = async () => {
    const respuesta = await fetch(`${API_URL}/reset`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });
    return await respuesta.json();
};