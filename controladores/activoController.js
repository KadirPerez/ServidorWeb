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

async function getActivosByDescripcion(req, res){
    const activoByDescripcion = await models.Activo.findOne({
        where: {descripcion: req.params.descripcion}
    })
    
    return res.json(activoByDescripcion)
}

async function postActivo(req, res){  
    try {
        const nuevoActivo = await models.Activo.create({
            numSerie: req.body.numSerie,
            numInventario: req.body.numInventario,
            descripcion: req.body.descripcion,
            nombreImagen: req.body.nombreImagen,
            imagen: req.body.imagen,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        let responsable = null
        if(req.body.idResponsable != null){
            responsable = await models.Responsable.findOne({
                where: {id: req.body.idResponsable}
            })
            await responsable.addActivo(nuevoActivo);
        }

        let ubicacion = null
        if(req.body.idUbicacion != null){
            ubicacion = await models.Ubicacion.findOne({
                where: {id: req.body.idUbicacion}
            }) 
            await ubicacion.addActivo(nuevoActivo);
        }

        if(req.body.tags != null){
            for(tagLeido of req.body.tags){
                tagPorAgregar = await models.Tag.findOne({
                    where: {tag: tagLeido}
                })
                await nuevoActivo.addTag(tagPorAgregar);
            }
        }

        res.status(201).json({ message: 'Activo creado correctamente'});
    } catch (error) {
        res.status(500).json({ message: `Error interno del servidor. ${error}` , error: error});
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

        await models.ActivoTag.destroy({
            where: { activoId: activoAEliminar.id }
        });

        await activoAEliminar.destroy();

        res.status(201).json({ message: 'Activo eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor'});
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

        res.status(201).json({ message: 'Activo editado correctamente'});
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}

async function addResponsable(req, res){
    try {
        const activo = await models.Activo.findOne({
            where: {id: req.params.idActivo}
        })
        
        if (!activo) {
            throw new Error('El activo no existe');
        }

        const responsable = await models.Responsable.findOne({
            where: {numEmpleado: req.params.numEmpleado}
        }) 
        
        if(!responsable) {
            throw new Error('El responsable no existe');
        }

        responsable.addActivo(activo);

        res.status(201).json({ message: 'Responsable agregado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function addUbicacion(req, res){
    try {
        const activo = await models.Activo.findOne({
            where: {id: req.params.idActivo}
        })
        
        if (!activo) {
            throw new Error('El activo no existe');
        }

        const ubicacion = await models.Ubicacion.findOne({
            where: {id: req.params.idUbicacion}
        }) 
        
        if(!ubicacion) {
            throw new Error('La ubicacion no existe');
        }

        ubicacion.addActivo(activo);

        res.status(201).json({ message: 'Ubicacion agregada correctamente'});
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function addTag(req, res){
    try {
        const activo = await models.Activo.findOne({
            where: {id: req.params.idActivo}
        })
        
        if (!activo) {
            throw new Error('El activo no existe');
        }

        const tag = await models.Tag.findOne({
            where: {id: req.params.idTag}
        }) 
        
        if(!tag) {
            throw new Error('EL tag no existe');
        }

        tag.addActivo(activo);

        res.status(201).json({ message: 'Tag agregado correctamente'});
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function getTags(req, res) {
    const activo = await models.Activo.findOne({
        where: {id: req.params.id}
    })

    const tagsAsociados = await activo.getTags()
    
    return res.json(tagsAsociados)
}

async function deleteTag(req, res) {
    const activo = await models.Activo.findOne({
        where: {id: req.params.idActivo}
    })

    activo.removeTag(req.params.idTag)
}

async function deleteResponsable(req, res) {
    const activo = await models.Activo.findOne({
        where: {id: req.params.id}
    })
    await activo.setResponsable(null);
    activo.idResponsable = null
}

async function deleteUbicacion(req, res) {
    const activo = await models.Activo.findOne({
        where: {id: req.params.id}
    })
    await activo.setUbicacion(null);
    activo.idUbicacion = null
}

// Exportar las funciones
module.exports = {getAllActivos, getActivosById, getActivosBySerie, postActivo, 
    deleteActivo, putActivo, addResponsable, addUbicacion, addTag, getTags, deleteTag, 
    getActivosByDescripcion,deleteResponsable, deleteUbicacion}
