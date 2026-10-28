const express = require('express');
// // Importa el middleware cors para permitir la comunicación cruzada entre react y node
const cors = require('cors');
const reservaRoutes = require('./src/routes/inventoryRoutes');
const juegoRoutes = require('./src/routes/gameRoutes');

// Inicializa la aplicación de express
const app = express();
const PORT = 5000;

// Habilita cors para interceptar peticiones y permitir el acceso desde el frontend
app.use(cors());
// Transforma los json a objetos manejables por javascript
app.use(express.json());

// Registrar prefijos de rutas
app.use('/api', reservaRoutes)
app.use('/api', juegoRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});