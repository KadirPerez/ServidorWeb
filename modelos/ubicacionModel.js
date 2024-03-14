// Importar el módulo fs (sistema de archivos)
const fs = require('fs');

// Ruta del archivo de base de datos JSON
const filePath = './db.json';

// Definición de la clase Ubicacion y sus métodos y propiedades
class Ubicacion {
  constructor(id, descripcion, activos, imagen) {
    this.id = id;
    this.descripcion = descripcion;
    this.activos = activos;
    this.imagen = imagen;
  }
}

// Función para leer todos los datos de ubicaciones
const readData = () => {
    const data = fs.readFileSync(filePath)
    return JSON.parse(data).ubicaciones || []
}

// Función para leer datos de una ubicación por su ID
const readDataById = (id) => {
  const data = fs.readFileSync(filePath);
  const ubicaciones = JSON.parse(data).ubicaciones;
  const ubicacionesConIdDeseado = ubicaciones.filter(ubicacion => ubicacion.id === parseInt(id.slice(1)));

  return ubicacionesConIdDeseado;
}

// Función para escribir datos en el archivo JSON
const writeData = (newActivos) => {
  let data = fs.readFileSync(filePath);
  data = JSON.parse(data);
  data.ubicaciones = newActivos;
  fs.writeFileSync(filePath, JSON.stringify(data));
}

// Función para eliminar datos de ubicaciones por su ID
const deleteData = (id) => {
  let jsonData = fs.readFileSync(filePath);
  let data = JSON.parse(jsonData); 

  data.ubicaciones = data.ubicaciones.filter(ubicacion => ubicacion.id !== parseInt(id.slice(1)));

  fs.writeFileSync(filePath, JSON.stringify(data));
};

// Función para actualizar datos de ubicaciones por su ID
const putData = (id, newData) => {
  let jsonData = fs.readFileSync(filePath);
  let data = JSON.parse(jsonData);

  const indiceActivo = data.ubicaciones.findIndex(ubicacion => ubicacion.id === parseInt(id.slice(1)));

  if (indiceActivo !== -1) {
      data.ubicaciones[indiceActivo] = newData;

      fs.writeFileSync(filePath, JSON.stringify(data));
  } else {
      console.error('No se encontró ninguna ubicación con el ID proporcionado');
  }
};

// Exportar funciones y la clase Ubicacion
module.exports =  {Ubicacion, readData , readDataById, writeData, deleteData, putData}
