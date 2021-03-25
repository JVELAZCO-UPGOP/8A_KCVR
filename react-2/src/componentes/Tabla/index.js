import React, { useState } from "react";
import Encabezado from "./Encabezado";
import Fila from "./Fila";

function Tabla() {
  const [mascotas, setMascotas] = useState([
    {
      tipo: "Gato",
      nombre: "Chispitas",
      dueno: "Miguel",
    },
    {
      tipo: "Perro",
      nombre: "Bella",
      dueno: "Karen",
    },
  ]);
  const columnas = mascotas.length > 0 ? Object.keys(mascotas[0]) : [];
  return (
    <table className="table table-stripped table-hover">
       <Encabezado columnas={columnas} />
      <tbody id="lista-mascotas">
      {mascotas.map((mascota, index) => (
      <Fila index={index} mascota={mascota} />
      ))}
      </tbody>
    </table>
  );
}

export default Tabla;