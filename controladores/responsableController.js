// Importar el modelo de responsable
const responsable = require("../modelos/responsableModel")

// Función asincrónica para obtener todos los responsables
async function getAllResponsables(req, res){
    const allResponsables = await responsable.readData()
    return res.json(allResponsables)
}

// Función asincrónica para obtener responsables por su ID
async function getResponsablesById(req, res){
    const responsablesById = await responsable.readDataById(req.params.id)
    return res.json(responsablesById)
}

// Función asincrónica para crear un nuevo responsable
async function createNewResponsable(req, res){
    const responsableExistente = await responsable.readData()   
    const body = req.body
    const newResponsable = {
        id: responsableExistente.length + 1,
        ... body,
    }

    responsableExistente.push(newResponsable)
    responsable.writeData(responsableExistente)

    return res.status(201).json(newResponsable);
}

// Función asincrónica para eliminar un responsable
async function deleteResponsable(req, res){
    const responsablesRestantes = await responsable.deleteData(req.params.id)
    return res.json(responsablesRestantes)
}

// Función asincrónica para actualizar un responsable
async function putResponsable(req, res){
    const body = req.body
    const newResponsable = {
        id: parseInt(req.params.id.slice(1)),
        ... body,
    }

    const responsablesModificados = await responsable.putData(req.params.id, newResponsable)
    return res.json(responsablesModificados)
}

// Exportar las funciones
module.exports = {getAllResponsables, getResponsablesById, createNewResponsable, deleteResponsable, putResponsable}