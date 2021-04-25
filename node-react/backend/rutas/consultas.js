module.exports = function consultasHandler({
  consultas,
  veterinarias,
  mascotas,
}) {
    return   {
    get: (data, callback) => {
      console.log("handler consultas", { data });
      if (typeof data.indice !== "undefined") {

        if (consultas[data.indice]) {
          return callback(200, consultas[data.indice]);
        }
        return callback(404, {mensaje: "La consulta con indice ${data.indice} no es encontrada",});
      }
      let _consultas = [...consultas];

      if (
        data.query &&
        (typeof data.query.mascota !== "undefined" ||
          data.query.veterinaria !== "undefined" ||
          data.query.historia !== "undefined" ||
          data.query.diagnostico !== "undefined")
      ) {
        const llavesQuery = Object.keys(data.query);
        for (const llave of llavesQuery) {
          _consultas = _consultas.filter((_consulta) => {
            let resultado = false;
            if (llave === "diagnostico" || llave === "historia") {
              const expresionRegular = new RegExp(data.query[llave], "ig");
              resultado = _consulta[llave].match(expresionRegular);
            }
            if (llave === "veterinaria" || llave === "mascota") {
              resultado = _consulta[llave] == data.query[llave];
            }
            return resultado;
          });
        }
      }
      _consultas = _consultas.map((consulta) => ({
        ...consulta,
        mascota: { ...mascotas[consulta.mascota], id: consulta.mascota },
        veterinaria: {
          ...veterinarias[consulta.veterinaria],
          id: consulta.veterinaria,
        },
      }));
      callback(200, _consultas);
    },
    post: (data, callback) => {
        let nuevaConsulta = data.payload;
        nuevaConsulta.fechaCreacion = new Date();
        nuevaConsulta.fechaEdicion = null;
        consultas = [...consultas, nuevaConsulta];
        callback(201, nuevaConsulta);
      },
      put: (data, callback) => {
        if (typeof data.indice !== "undefined") {
          if (consultas[data.indice]) {
            const { fechaCreacion } = consultas[data.indice];
            consultas[data.indice] = {
              ...data.payload,
              fechaCreacion,
              fechaEdicion: new Date(),
            };
            return callback(200, consultas[data.indice]);
          }
          return callback(404, {
            mensaje: "La consulta con indice ${data.indice} no encontrado",
          });
        }
        callback(400, { mensaje: "indice no enviado" });
      },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (consultas[data.indice]) {
          consultas = consultas.filter(
            (_consulta, indice) => indice != data.indice
          );
          return callback(204, {
            mensaje: "El elemento con indice ${data.indice} eliminado",
          });
        }
        return callback(404, {
          mensaje: "La consulta con indice ${data.indice} no encontrado",
        });
      }
      callback(400, { mensaje: "Indice no enviado" });
    },
  };
};
