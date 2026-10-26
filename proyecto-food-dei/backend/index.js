const express = require('express');
// cors permite conectar react con node
const cors = require('cors');
const reservaRoutes = require('./src/routes/inventoryRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Registrar prefijos de rutas
app.use('/api/inventario', reservaRoutes)
//app.use('/api/juego', juegoRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
