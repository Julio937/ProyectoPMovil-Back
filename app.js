const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const paisController = require('./controllers/paisController');
const accionController = require('./controllers/accionController');
const gestoraController = require('./controllers/gestoraController');

const app = express();

app.use(express.json());

// Rutas Usuario
app.get('/usuarios', usuarioController.obtenerUsuarios);
app.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);
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

// Rutas Acción
app.get('/acciones', accionController.obtenerAcciones);
app.get('/acciones/:id', accionController.obtenerAccionPorId);
app.post('/acciones', accionController.crearAccion);
app.put('/acciones/:id', accionController.actualizarAccion);
app.delete('/acciones/:id', accionController.eliminarAccion);

// Rutas Gestora
app.get('/gestoras', gestoraController.obtenerGestoras);
app.get('/gestoras/:id', gestoraController.obtenerGestoraPorId);
app.post('/gestoras', gestoraController.crearGestora);
app.put('/gestoras/:id', gestoraController.actualizarGestora);
app.delete('/gestoras/:id', gestoraController.eliminarGestora);
app.get('/gestoras/pais/:pais_id', gestoraController.obtenerGestorasPorPais);

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
