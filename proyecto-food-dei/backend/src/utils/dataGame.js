// Variable que guarda el número aleatorio entre 1 y 100
let numeroOculto = Math.floor(Math.random() * 100) + 1;
let historial = [];

const resetearJuego = () => {
    numeroOculto = Math.floor(Math.random() * 100) + 1;
    historial = [];
    return numeroOculto;
};

module.exports = {
    getNumeroOculto: () => numeroOculto,
    getHistorial: () => historial,
    agregarHistorial: (intento) => historial.push(intento),
    resetearJuego
};