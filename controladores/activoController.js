// Importar el modelo de activo
const activo = require("../modelos/activoModel.js")

// Función asincrónica para obtener todos los activos
async function getAllActivos(req, res){
    const allActivos = await activo.readData()
    return res.json(allActivos)
}

// Función asincrónica para obtener activos por su ID
async function getActivosById(req, res){
    const activosById = await activo.readDataById(req.params.id)
    return res.json(activosById)
}

// Función asincrónica para obtener activos por su número de serie
async function getActivosBySerie(req, res){
    const activosBySerie = await activo.readDataBySerie(req.params.serie)
    return res.json(activosBySerie)
}

// Función asincrónica para crear un nuevo activo
async function createNewActivo(req, res){
    const activosExistente = await activo.readData()   
    const body = req.body
    const newActivo = {
        id: activosExistente.length + 1,
        ... body,
    }

    activosExistente.push(newActivo)
    activo.writeData(activosExistente)

    return res.status(201).json(newActivo);
}

// Función asincrónica para eliminar un activo
async function deleteActivo(req, res){
    const activosRestantes = await activo.deleteData(req.params.id)
    return res.json(activosRestantes)
}

// Función asincrónica para actualizar un activo
async function putActivo(req, res){
    const body = req.body
    const newActivo = {
        id: parseInt(req.params.id.slice(1)),
        ... body,
    }

    const activosModificados = await activo.putData(req.params.id, newActivo)
    return res.json(activosModificados)
}

// Exportar las funciones
module.exports = {getAllActivos, getActivosById, getActivosBySerie, createNewActivo, deleteActivo, putActivo}
