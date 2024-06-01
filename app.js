const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const paisController = require('./controllers/paisController'); // Asegúrate de importar el controlador de países

const app = express();

app.use(express.json());

// Rutas Usuario
app.get('/usuarios', usuarioController.obtenerUsuarios);
app.post('/usuarios', usuarioController.crearUsuario);
app.post('/usuarios/acciones', usuarioController.asociarAccionAUsuario);
app.put('/usuarios/:id', usuarioController.actualizarUsuario);
app.delete('/usuarios/:id', usuarioController.eliminarUsuario);

// Rutas País
app.get('/paises', paisController.obtenerPaises);
app.get('/paises/:id', paisController.obtenerPaisPorId);
app.post('/paises', paisController.crearPais);
app.put('/paises/:id', paisController.actualizarPais);
app.delete('/paises/:id', paisController.eliminarPais);

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
