const API_URL = 'http://localhost:5000/api';

export const enviarIntento = async (numero) => {
    // Realiza una petición asíncrona
    const respuesta = await fetch(`${API_URL}/guess`, {
        method: 'POST',
        //Informa al servidor que el contenido viaja en formato json
        headers: {'Content-Type': 'application/json'},
        //Convierte el contenido en fomrato json
        body: JSON.stringify({numero})
    });
    //Espera la respuesta del servidor y la transforma de json a un objeto de javascript
    return await respuesta.json();
};

export const reiniciarJuego = async () => {
    const respuesta = await fetch(`${API_URL}/reset`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });
    return await respuesta.json();
};