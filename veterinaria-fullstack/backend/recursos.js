module.exports = {
    mascotas: [
      { tipo: "Perro", nombre: "Bella0", dueno: "Karen" },
      { tipo: "Perro", nombre: "Bella1", dueno: "Karen" },
      { tipo: "Perro", nombre: "Bella2", dueno: "Karen" },
      { tipo: "Perro", nombre: "Bella3", dueno: "Karen" },
      { tipo: "Perro", nombre: "Bella4", dueno: "Karen" },
    ],

    veterinarias: [
      { nombre: "Karen", apellido: "Vielma", documento: "12345" },
      { nombre: "Miguel", apellido: "Martinez", documento: "182900" },
      { nombre: "Jose", apellido: "Gomez", documento: "88888" },
      { nombre: "Fernanda", apellido: "Gonzalez", documento: "10000" },
    ],

    duenos: [
      { nombre: "Maria", apellido: "Lucero", documento: "120000" },
      { nombre: "Alondra", apellido: "Garza", documento: "9036478" },
      { nombre: "Ricardo", apellido: "Luna", documento: "333388888" },
      { nombre: "Natalia", apellido: "Salazar", documento: "567483" },
    ],

    consultas: [
      {
        mascota: 0,
        veterinaria: 0,
        fechaCreacion: new Date(),
        fechaEdicion: new Date(),
        historia: "",
        diagnostico: "",
      },
    ],
  };