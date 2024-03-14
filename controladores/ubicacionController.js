// Importar el modelo de ubicación
const ubicacion = require("../modelos/ubicacionModel.js")

// Función asincrónica para obtener todas las ubicaciones
async function getAllUbicaciones(req, res){
    const allUbicaciones = await ubicacion.readData()
    return res.json(allUbicaciones)
}

// Función asincrónica para obtener ubicaciones por su ID
async function getUbicacionesById(req, res){
    const ubicacionesById = await ubicacion.readDataById(req.params.id)
    return res.json(ubicacionesById)
}

// Función asincrónica para crear una nueva ubicación
async function createNewUbicacion(req, res){
    const ubicacionesExistente = await ubicacion.readData()   
    const body = req.body
    const newUbicacion = {
        id: ubicacionesExistente.length + 1,
        ... body,
    }

    ubicacionesExistente.push(newUbicacion)
    ubicacion.writeData(ubicacionesExistente)

    return res.status(201).json(newUbicacion);
}

// Función asincrónica para eliminar una ubicación
async function deleteUbicacion(req, res){
    const ubicacionesRestantes = await ubicacion.deleteData(req.params.id)
    return res.json(ubicacionesRestantes)
}

// Función asincrónica para actualizar una ubicación
async function putUbicacion(req, res){
    const body = req.body
    const newUbicacion = {
        id: parseInt(req.params.id.slice(1)),
        ... body,
    }

    const ubicacionesModificados = await ubicacion.putData(req.params.id, newUbicacion)
    return res.json(ubicacionesModificados)
}

// Exportar las funciones
module.exports = {getAllUbicaciones, getUbicacionesById, createNewUbicacion, deleteUbicacion, putUbicacion}
