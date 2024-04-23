// Importar el modelo de ubicación
const models = require("../models")

// Función asincrónica para obtener todas las ubicaciones
async function getAllUbicaciones(req, res){
    const allUbicaciones = await models.Ubicacion.findAll()
    return res.json(allUbicaciones)
}

// Función asincrónica para obtener ubicaciones por su ID
async function getUbicacionesById(req, res){
    const ubicacionById = await models.Ubicacion.findOne({
        where: {id: req.params.id}
    })
    return res.json(ubicacionById)
}

async function postUbicacion(req, res){  
    try {
        const nuevaUbicacion = await models.Ubicacion.create({
            descripcion: req.body.descripcion,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ message: 'Ubicacion creada correctamente', nuevaUbicacion });
    } catch (error) {
        console.error('Error al crear la ubicacion:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function deleteUbicacion(req, res){  
    try {
        let ubicacionAEliminar = await models.Ubicacion.findOne({
            where: {id: req.params.id}
        });

        if (!ubicacionAEliminar) {
        throw new Error('La ubicacion no existe');
        }

        await ubicacionAEliminar.destroy();

        res.status(201).json({ message: 'Ubicacion eliminada correctamente', ubicacionAEliminar });
    } catch (error) {
        console.error('Error al eliminar la ubicacion:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function putUbicacion(req, res){  
    try {
        const ubicacionAEditar = await models.Ubicacion.findOne({
            where: {id: req.params.id}
        });

        if (!ubicacionAEditar) {
            throw new Error('La ubicacion no existe');
        }

        await ubicacionAEditar.update(req.body, { fields: Object.keys(req.body) });

        res.status(201).json({ message: 'Ubicacion editada correctamente', ubicacionAEditar });
    } catch (error) {
        console.error('Error al editar la ubicacion:', error.message);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}

// Exportar las funciones
module.exports = {getAllUbicaciones, getUbicacionesById, postUbicacion, deleteUbicacion, putUbicacion}
