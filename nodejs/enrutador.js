module.exports = { 
    ruta: (data, callback) => {
      callback(200, {mensaje: "Estas es /ruta"});
    },
    mascotas: {
      get: (data, callback) => {
        if (typeof data.indice !== "undefined") {
          console.log("handler mascotas", { data });
          if (global.recursos.mascotas[data.indice]) {
            return callback(200, global.recursos.mascotas[data.indice]);
          }
          return callback(404, {mensaje: "Mascota con indice ${data.indice} no encontrada",});
        }
        callback(200, global.recursos.mascotas);
      },
      post: (data, callback) => {
        global.recursos.mascotas.push(data.payload);
        callback(201, data.payload);
      },
    },
    noEncontrado: (data, callback) => {
      callback(404, {mensaje: "Ruta No encontrada"});
    },
}
