const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");

module.exports = { 
    ruta: (data, callback) => {
      callback(200, {mensaje: "Estas es /ruta"});
    },
    mascotas: mascotas(recursos.mascotas),
    noEncontrado: (data, callback) => {
      callback(404, {mensaje: "Ruta No encontrada"});
    },
}
