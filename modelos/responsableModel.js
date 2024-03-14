// Importar el módulo fs (sistema de archivos)
const fs = require('fs');

// Ruta del archivo de base de datos JSON
const filePath = './db.json';

// Definición de la clase Responsable y sus métodos y propiedades
class Responsable {
  constructor(id, numeroEmpleado, nombre, activosCustodia, imagen) {
    this.id = id;
    this.numeroEmpleado = numeroEmpleado;
    this.nombre = nombre;
    this.activosCustodia = activosCustodia;
    this.imagen = imagen;
  }
}

// Función para leer todos los datos de responsables
const readData = () => {
    const data = fs.readFileSync(filePath)
    return JSON.parse(data).responsables || []
}

// Función para leer datos de un responsable por su ID
const readDataById = (id) => {
  const data = fs.readFileSync(filePath);
  const responsables = JSON.parse(data).responsables;
  const responsablesConIdDeseado = responsables.filter(responsable => responsable.id === parseInt(id.slice(1)));

  return responsablesConIdDeseado;
}

// Función para escribir datos en el archivo JSON
const writeData = (newActivos) => {
  let data = fs.readFileSync(filePath);
  data = JSON.parse(data);
  data.responsables = newActivos;
  fs.writeFileSync(filePath, JSON.stringify(data));
}

// Función para eliminar datos de responsables por su ID
const deleteData = (id) => {
  let jsonData = fs.readFileSync(filePath);
  let data = JSON.parse(jsonData); 

  data.responsables = data.responsables.filter(responsable => responsable.id !== parseInt(id.slice(1)));

  fs.writeFileSync(filePath, JSON.stringify(data));
};

// Función para actualizar datos de responsables por su ID
const putData = (id, newData) => {
  let jsonData = fs.readFileSync(filePath);
  let data = JSON.parse(jsonData);

  const indiceActivo = data.responsables.findIndex(responsable => responsable.id === parseInt(id.slice(1)));

  if (indiceActivo !== -1) {
      data.responsables[indiceActivo] = newData;

      fs.writeFileSync(filePath, JSON.stringify(data));
  } else {
      console.error('No se encontró ningún activo con el ID proporcionado');
  }
};

// Exportar funciones y la clase Responsable
module.exports =  {Responsable, readData , readDataById, writeData, deleteData, putData}
