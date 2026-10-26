//Importacion de modulos necesarios
const dataGame = require('../utils/dataGame');

//----- ENDPOINTS
// POST /guess (Evalúa el número recibido)
const guess = (req, res) => {
    try{
        const { numero } = req.body;
        const numIngresado = parseInt(numero, 10);

        if(isNaN(numIngresado) || numIngresado < 1 || numIngresado > 100) {
            return res.status(400).json({
                mensaje: 'Por favor, ingresa un número válido entre 1 y 100'
            });
        }

        const secreto = dataGame.getNumeroOculto();
        console.log(secreto);
        let resultado = '';

        if(numIngresado < secreto){
            resultado = 'mayor';
        }else if (numIngresado > secreto){
            resultado = 'menor';
        }else{
            resultado = 'correcto';
        }

        //Se guarda el intento en el historial
        dataGame.agregarHistorial({
            numero: numIngresado,
            resultado
        })

        return res.status(200).json({
            resultado,
            numIngresado: numIngresado,
            historial: dataGame.getHistorial()
        });
    }catch (error){
        return res.status(500).json({
            mensaje: 'Error al procesar el intento'
        })
    }
};

// POST /reset (Genera un nuevo número)
const reset = (req, res)=> {
    try {
        dataGame.resetearJuego();
        return res.status(200).json({
            mensaje: 'Juego reiniciado. Se ha generado un nuevo número oculto.',
            historial: []
        });
    }catch (error){
        return res.status(500).json({ mensaje: 'Error al reiniciar el juego.' });
    }
}

// Exportamos nuestras funciones y objetos para que puedan ser utilizados en otros archivos
module.exports = {
    guess,
    reset
};