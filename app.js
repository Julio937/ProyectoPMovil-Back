const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const app = express();

app.use(express.json());

// Rutas Usuario
app.get('/usuarios', usuarioController.obtenerUsuarios);
app.post('/usuarios', usuarioController.crearUsuario);
app.post('/usuarios/:usuario_id/acciones/:accion_id', usuarioController.asociarAccionAUsuario);
app.put('/usuarios/:id', usuarioController.actualizarUsuario);
app.delete('/usuarios/:id', usuarioController.eliminarUsuario);

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
