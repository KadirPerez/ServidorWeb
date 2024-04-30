// Importar el modelo de tags
const models = require("../models")

// Función asincrónica para obtener todos los tags
async function getAllTags(req, res){
    const allTags = await models.Tag.findAll()
    return res.json(allTags)
}

// Función asincrónica para obtener tags por su ID
async function getTagById(req, res){
    const tagById = await models.Tag.findOne({
        where: {id: req.params.id}
    })
    return res.json(tagById)
}

async function getTagByTag(req, res){
    const tagByTag = await models.Tag.findOne({
        where: {tag: req.params.tag}
    })
    return res.json(tagByTag)
}

async function postTag(req, res){  
    try {
        const nuevoTag = await models.Tag.create({
            tag: req.body.tag,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ message: 'Tag creado correctamente', nuevoTag });
    } catch (error) {
        console.error('Error al crear el tag:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function deleteTag(req, res){  
    try {
        let tagAEliminar = await models.Tag.findOne({
            where: {id: req.params.id}
        });

        if (!tagAEliminar) {
        throw new Error('El tag no existe');
        }

        await models.ActivoTag.destroy({
            where: { tagId: tagAEliminar.id }
        });

        await tagAEliminar.destroy();

        res.status(201).json({ message: 'Tag eliminado correctamente', tagAEliminar });
    } catch (error) {
        console.error('Error al eliminar el tag:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function putTag(req, res){  
    try {
        const tagAEditar = await models.Tag.findOne({
            where: {id: req.params.id}
        });

        if (!tagAEditar) {
            throw new Error('El tag no existe');
        }

        await tagAEditar.update(req.body, { fields: Object.keys(req.body) });

        res.status(201).json({ message: 'Tag editado correctamente', tagAEditar });
    } catch (error) {
        console.error('Error al editar el tag:', error.message);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}

async function addActivo(req, res){
    try {
        const tag = await models.Tag.findOne({
            where: {id: req.params.idTag}
        })
        
        if (!tag) {
            throw new Error('El tag no existe');
        }

        const activo = await models.Activo.findOne({
            where: {id: req.params.idActivo}
        }) 
        
        if(!tag) {
            throw new Error('El activo no existe');
        }

        activo.addTag(tag);

        res.status(201).json({ message: 'Activo agregado correctamente'});
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function getMisActivos(req, res) {
    const tag = await models.Tag.findOne({
        where: {id: req.params.id}
    })

    const activosAsociados = await tag.getActivos()
    
    return res.json(activosAsociados)
}

async function deleteActivo(req, res) {
    const tag = await models.Tag.findOne({
        where: {id: req.params.idTag}
    })

    tag.removeActivo(req.params.idActivo)
}

// Exportar las funciones
module.exports = {getAllTags, getTagById, postTag, deleteTag, putTag, addActivo, getMisActivos, getTagByTag, deleteActivo}