const Usuario = require('../models/usuario');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).send('Error al crear el usuario');
  }
};
