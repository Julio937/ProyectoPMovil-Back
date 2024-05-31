const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const app = express();

app.use(express.json());

app.get('/usuarios', usuarioController.obtenerUsuarios);
app.post('/usuarios', usuarioController.crearUsuario);

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
