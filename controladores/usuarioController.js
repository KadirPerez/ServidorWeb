// Importar el modelo de usuarios
const models = require("../models")

// Función asincrónica para obtener todos los usuarios
async function getAllUsuarios(req, res){
    const allUsuarios = await models.Usuario.findAll()
    return res.json(allUsuarios)
}

// Función asincrónica para obtener usuarios por su ID
async function getUsuarioById(req, res){
    const usuarioById = await models.Usuario.findOne({
        where: {id: req.params.id}
    })
    return res.json(usuarioById)
}

async function postUsuario(req, res){  
    try {
        const nuevoUsuario = await models.Usuario.create({
            nombreUsuario: req.body.nombreUsuario,
            login: req.body.login,
            password: req.body.password,
            permisos: req.body.permisos,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ message: 'Usuario creado correctamente', nuevoUsuario });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function deleteUsuario(req, res){  
    try {
        let usuarioAEliminar = await models.Usuario.findOne({
            where: {id: req.params.id}
        });

        if (!usuarioAEliminar) {
        throw new Error('El usuario no existe');
        }

        await usuarioAEliminar.destroy();

        res.status(201).json({ message: 'Usuario eliminado correctamente', usuarioAEliminar });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function putUsuario(req, res){  
    try {
        const usuarioAEditar = await models.Usuario.findOne({
            where: {id: req.params.id}
        });

        if (!usuarioAEditar) {
            throw new Error('El usuario no existe');
        }

        await usuarioAEditar.update(req.body, { fields: Object.keys(req.body) });

        res.status(201).json({ message: 'Usuario editado correctamente', usuarioAEditar });
    } catch (error) {
        console.error('Error al editar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}

// Exportar las funciones
module.exports = {getAllUsuarios, getUsuarioById, postUsuario, deleteUsuario, putUsuario}
