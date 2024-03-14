// Importar el módulo fs (sistema de archivos)
const fs = require('fs');

// Ruta del archivo de base de datos JSON
const filePath = './db.json';

// Definición de la clase Activo y sus métodos y propiedades
class Activo {
    constructor(id, numeroSerie, numeroInventario, tipo, descripcion, ubicacion, responsable, imagen) {
      this.id = id;
      this.numeroSerie = numeroSerie;
      this.numeroInventario = numeroInventario;
      this.tipo = tipo;
      this.descripcion = descripcion;
      this.ubicacion = ubicacion;
      this.responsable = responsable;
      this.imagen = imagen;
    }
}

// Función para leer todos los datos de activos
const readData = () => {
    const data = fs.readFileSync(filePath)
    return JSON.parse(data).activos
}

// Función para leer datos de un activo por su ID
const readDataById = (id) => {
    const data = fs.readFileSync(filePath);
    const activos = JSON.parse(data).activos;
    const activosConIdDeseado = activos.filter(activo => activo.id === parseInt(id.slice(1)));

    return activosConIdDeseado;
}

// Función para leer datos de activos por su número de serie
const readDataBySerie = (serie) => {
    const data = fs.readFileSync(filePath);
    const activos = JSON.parse(data).activos;
    const activosConNumSerieDeseado = activos.filter(activo => activo.numero_serie === serie.slice(1));

    return activosConNumSerieDeseado;
}

// Función para escribir datos en el archivo JSON
const writeData = (newActivos) => {
    let data = fs.readFileSync(filePath);
    data = JSON.parse(data);
    data.activos = newActivos;
    fs.writeFileSync(filePath, JSON.stringify(data));
}

// Función para eliminar datos de activos por su ID
const deleteData = (id) => {
    let jsonData = fs.readFileSync(filePath);
    let data = JSON.parse(jsonData); 

    data.activos = data.activos.filter(activo => activo.id !== parseInt(id.slice(1)));

    fs.writeFileSync(filePath, JSON.stringify(data));
};

// Función para actualizar datos de activos por su ID
const putData = (id, newData) => {
    let jsonData = fs.readFileSync(filePath);
    let data = JSON.parse(jsonData);

    const indiceActivo = data.activos.findIndex(activo => activo.id === parseInt(id.slice(1)));

    if (indiceActivo !== -1) {
        data.activos[indiceActivo] = newData;

        fs.writeFileSync(filePath, JSON.stringify(data));
    } else {
        console.error('No se encontró ningún activo con el ID proporcionado');
    }
};

// Exportar funciones y la clase Activo
module.exports =  {Activo, readData, readDataById, readDataBySerie, writeData, deleteData, putData}