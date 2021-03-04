const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const enrutador = require("./enrutador");

module.exports = (req, res) => {
    //obtener url desde el objeto request 
     const urlActual = req.url;
     const urlParseada = url.parse(urlActual, true);
 
   //obtener la ruta
   const ruta = urlParseada.pathname;
 
    //Quitar el slash
   const rutaLimpia = ruta.replace(/^\/+|\/+$/g, "");
 
   //Obtener el método http
   const metodo =  req.method.toLowerCase();
 
   //Obtener variables del query url
   const { query = {} } = urlParseada;
 
   //Obtener los headers
   const { headers = {} } = req;
 
   //Obtener el payload
   const decoder = new StringDecoder("utf-8");
   let buffer = "";
 
   //Ir acumulando la data cuando el request reciba un payload
   req.on("data", (data) => {
     buffer += decoder.write(data);
   });
 
   //Termina de acumular los datos y decirle al decoder que finalice
   req.on("end", () => {
     buffer += decoder.end();
 
     if (headers["content-type"] === "application/json") {
       buffer = JSON.parse(buffer);
     }
 
     //revisar si tiene subrutas
     if (rutaLimpia.indexOf("/") > -1) {
       var [rutaPrincipal, indice] = rutaLimpia.split("/");
     }
 
     //Ordenar la data 
     const data = {
       indice,
       ruta: rutaPrincipal || rutaLimpia,
       query,
       metodo,
       headers,
       payload: buffer,
     };
 
     //Elegir el manejador dependiendo de la ruta  //(handler) y asignarle función que el enrutador tiene 
     let handler;
     if (data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
       handler = enrutador[data.ruta][metodo];
     } else {
       handler = enrutador.noEncontrado;
     }
     console.log("handler", handler);
     
     //Ejecutar handler (manejador) para enviar respuesta
     if(typeof handler === "function") {
       handler(data, (statusCode = 200, mensaje) => {
         const respuesta = JSON.stringify(mensaje);
         res.setHeader("Content-Type", "application/json");
         res.writeHead(statusCode);
         // linea donde se responde a la aplicación cliente
         res.end(respuesta);
       })
     }
 
   });
 };