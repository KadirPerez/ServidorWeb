// Importar el modelo de responsable
const models = require("../models")

// Función asincrónica para obtener todos los responsables
async function getAllResponsables(req, res){
    const allResponsables = await models.Responsable.findAll()
    return res.json(allResponsables)
}

// Función asincrónica para obtener responsables por su ID
async function getResponsablesById(req, res){
    const responsableById = await models.Responsable.findOne({
        where: {id: req.params.id}
    })
    return res.json(responsableById)
}

async function getResponsablesByNombre(req, res){
    const responsableByNombre = await models.Responsable.findOne({
        where: {nombre: req.params.nombre}
    })
    return res.json(responsableByNombre)
}

async function getResponsablesByNumEmpleado(req, res){
    const responsableByNumEmpleado = await models.Responsable.findOne({
        where: {numEmpleado: req.params.numEmpleado}
    })
    return res.json(responsableByNumEmpleado)
}

async function postResponsable(req, res){  
    try {
        const nuevoResonsable = await models.Responsable.create({
            numEmpleado: req.body.numEmpleado,
            nombre: req.body.nombre,
            imagen: req.body.imagen,
            nombreImagen: req.body.nombreImagen,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ message: 'Responsable creado correctamente', nuevoResonsable });
    } catch (error) {
        console.error('Error al crear el responsable:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function deleteResponsable(req, res){  
    try {
        let responsableAEliminar = await models.Responsable.findOne({
            where: {id: req.params.id}
        });

        if (!responsableAEliminar) {
        throw new Error('El responsable no existe');
        }

        await responsableAEliminar.setActivos(null);

        await responsableAEliminar.destroy();

        res.status(201).json({ message: 'Responsable eliminado correctamente', responsableAEliminar });
    } catch (error) {
        console.error('Error al eliminar el responsable:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function putResponsable(req, res){  
    try {
        const responsableAEditar = await models.Responsable.findOne({
            where: {id: req.params.id}
        });

        if (!responsableAEditar) {
            throw new Error('El activo no existe');
        }

        await responsableAEditar.update(req.body, { fields: Object.keys(req.body) });

        res.status(201).json({ message: 'Responsable editado correctamente', responsableAEditar });
    } catch (error) {
        console.error('Error al editar el responsable:', error.message);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}

async function getActivos(req, res){
    const responsable = await models.Responsable.findOne({
        where: {id: req.params.id}
    });

    const activosAsociados = await responsable.getActivos()
    
    return res.json(activosAsociados)
}

// Exportar las funciones
module.exports = {getAllResponsables, getResponsablesById, postResponsable, deleteResponsable, 
    putResponsable, getActivos, getResponsablesByNumEmpleado, getResponsablesByNombre}