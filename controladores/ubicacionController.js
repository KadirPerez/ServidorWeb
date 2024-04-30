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

async function getUbicacionesByDescripcion(req, res){
    const ubicacionByDescripcion = await models.Ubicacion.findOne({
        where: {descripcion: req.params.descripcion}
    })
    return res.json(ubicacionByDescripcion)
}

async function postUbicacion(req, res){  
    try {
        const nuevaUbicacion = await models.Ubicacion.create({
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            nombreImagen: req.body.nombreImagen,
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

        await ubicacionAEliminar.setActivos(null);

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

async function getActivos(req, res){
    const ubicacion = await models.Ubicacion.findOne({
        where: {id: req.params.id}
    });

    const activosAsociados = await ubicacion.getActivos()
    
    return res.json(activosAsociados)
}

async function getActivos(req, res){
    const ubicacion = await models.Ubicacion.findOne({
        where: {id: req.params.id}
    });

    const activosAsociados = await ubicacion.getActivos()
    
    return res.json(activosAsociados)
}

// Exportar las funciones
module.exports = {getAllUbicaciones, getUbicacionesById, postUbicacion, deleteUbicacion, putUbicacion, getActivos, getUbicacionesByDescripcion}
