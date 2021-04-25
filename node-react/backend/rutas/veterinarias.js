module.exports = function veterinariasHandler(veterinarias){
    return   {
    get: (data, callback) => {
      console.log("handler veterinarias", { data });
      if (typeof data.indice !== "undefined") {
        if (veterinarias[data.indice]) {
          return callback(200, veterinarias[data.indice]);
        }
        return callback(404, {mensaje: "La veterinaria con indice ${data.indice} no encontrada",});
      }
 
      if (
        data.query &&
        (typeof data.query.nombre !== "undefined" ||
          data.query.apellido !== "undefined" ||
          data.query.documento !== "undefined")
      ) {
      
        const llavesQuery = Object.keys(data.query);

       
        let respuestaVeterinarias = [...veterinarias];

       
        for (const llave of llavesQuery) {
     
          respuestaVeterinarias = respuestaVeterinarias.filter(
            (_veterinaria) => {
          
              const expresionRegular = new RegExp(data.query[llave], "ig");

              const resultado = _veterinaria[llave].match(expresionRegular);

              
              return resultado;
            }
          );
        }
        return callback(200, respuestaVeterinarias);
      }
      callback(200, veterinarias);
    },
    post: (data, callback) => {
      veterinarias.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinarias[data.indice]) {
          veterinarias[data.indice] = data.payload;
          return callback(200, veterinarias[data.indice]);
        }
        return callback(404, {
          mensaje: 'La veterinaria con indice ${data.indice} no encontrada',
        });
      }
      callback(400, { mensaje: "Indice no enviado" });
    },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinarias[data.indice]) {
          veterinarias = veterinarias.filter(
            (_veterinaria, indice) => indice != data.indice
          );
          return callback(204, {
            mensaje: "El elemento con indice ${data.indice} eliminado",
          });
        }
        return callback(404, {
          mensaje: "La veterinaria con indice ${data.indice} no encontrada",
        });
      }
      callback(400, { mensaje: "Indice no enviado" });
    },
  };
};
