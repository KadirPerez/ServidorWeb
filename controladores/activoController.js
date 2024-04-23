// Importar el modelo de activo
const models = require("../models")

// Función asincrónica para obtener todos los activos
async function getAllActivos(req, res){
    const allActivos = await models.Activo.findAll()
    return res.json(allActivos)
}

// Función asincrónica para obtener activos por su ID
async function getActivosById(req, res){
    const activoById = await models.Activo.findOne({
        where: {id: req.params.id}
    })
    return res.json(activoById)
}

// Función asincrónica para obtener activos por su número de serie
async function getActivosBySerie(req, res){
    const activosBySerie = await models.Activo.findOne({
        where: {numSerie: req.params.serie}
    })
    
    return res.json(activosBySerie)
}

async function postActivo(req, res){  
    try {
        const nuevoActivo = await models.Activo.create({
            numSerie: req.body.numSerie,
            numInventario: req.body.numInventario,
            descripcion: req.body.descripcion,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ message: 'Activo creado correctamente', nuevoActivo });
    } catch (error) {
        console.error('Error al crear el activo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function deleteActivo(req, res){  
    try {
        let activoAEliminar = await models.Activo.findOne({
            where: {id: req.params.id}
        });

        if (!activoAEliminar) {
            throw new Error('El activo no existe');
        }

        await activoAEliminar.destroy();

        res.status(201).json({ message: 'Activo eliminado correctamente', activoAEliminar });
    } catch (error) {
        console.error('Error al eliminar el activo:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function putActivo(req, res){  
    try {
        const activoAEditar = await models.Activo.findOne({
            where: {id: req.params.id}
        });

        if (!activoAEditar) {
            throw new Error('El activo no existe');
        }

        await activoAEditar.update(req.body, { fields: Object.keys(req.body) });

        res.status(201).json({ message: 'Activo editado correctamente', activoAEditar });
    } catch (error) {
        console.error('Error al editar el activo:', error.message);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}

// Exportar las funciones
module.exports = {getAllActivos, getActivosById, getActivosBySerie, postActivo, deleteActivo, putActivo}
