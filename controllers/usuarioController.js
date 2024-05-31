const Usuario = require('../models/usuario');
const Pais = require('../models/pais');
const Accion = require('../models/accion');
const UsuarioAccion = require('../models/usuarioAccion');

// Obtener todos los usuarios con sus acciones asociadas
exports.obtenerUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios
    const usuarios = await Usuario.findAll();

    // Para cada usuario, buscar sus acciones asociadas a través de UsuarioAccion
    const usuariosConAcciones = await Promise.all(
      usuarios.map(async (usuario) => {
        // Buscar las asociaciones de UsuarioAccion para el usuario actual
        const usuarioAcciones = await UsuarioAccion.findAll({
          where: { usuario_id: usuario.id },
        });

        // Para cada asociación, buscar la acción correspondiente
        const acciones = await Promise.all(
          usuarioAcciones.map(async (ua) => {
            const accion = await Accion.findByPk(ua.accion_id);
            return accion ? accion.nombre : 'N/A';
          })
        );

        return {
          ...usuario.toJSON(),
          acciones: acciones.length > 0 ? acciones : ['N/A'],
        };
      })
    );

    res.json(usuariosConAcciones);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, cedula, pais_id } = req.body;
    const pais = await Pais.findByPk(pais_id);
    if (!pais) {
      return res.status(404).send('País no encontrado');
    }
    const nuevoUsuario = await Usuario.create({ nombre, apellido, correo, contraseña, cedula, pais_id });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).send('Error al crear el usuario');
  }
};

// Asociar una acción a un usuario
exports.asociarAccionAUsuario = async (req, res) => {
  try {
    const { usuario_id, accion_id, cantidad } = req.body;
    const usuario = await Usuario.findByPk(usuario_id);
    const accion = await Accion.findByPk(accion_id);

    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    if (!accion) {
      return res.status(404).send('Acción no encontrada');
    }

    const pais = await Pais.findByPk(usuario.pais_id);

    if (!pais.acciones_permitidas.includes(accion.id.toString())) {
      return res.status(403).send('Acción no permitida para el país del usuario');
    }

    // Crear la asociación con la cantidad y la fecha_operacion actual
    await UsuarioAccion.create({
      usuario_id,
      accion_id,
      cantidad,
      fecha_operacion: new Date(),
    });

    res.status(201).send('Acción asociada al usuario con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al asociar la acción al usuario');
  }
};

// Actualizar un usuario existente
exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, contraseña, cedula, pais_id } = req.body;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.correo = correo;
    usuario.contraseña = contraseña;
    usuario.cedula = cedula;
    usuario.pais_id = pais_id;

    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).send('Error al actualizar el usuario');
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    await usuario.destroy();
    res.status(200).send('Usuario eliminado con éxito');
  } catch (error) {
    res.status(500).send('Error al eliminar el usuario');
  }
};
