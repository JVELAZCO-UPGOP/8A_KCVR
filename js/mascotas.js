const listaMascotas = document.getElementById('lista-mascotas');
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');

let mascotas = [
    {
      tipo: "Gato",
      nombre: "manchas",
      dueno: "Miguel"
    },
    {
      tipo: "Perro",
      nombre: "Toby",
      dueno: "Susan"
    }
  ];

  function listarMascotas() {
    const htmlMascotas = mascotas.map((mascota, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.dueno}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
      </tr>`).join("");
      listaMascotas.innerHTML = htmlMascotas;
  }

  function enviarDatos(evento) {
      evento.preventDefault();
      const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value
      };
     mascotas.push(datos);
     listarMascotas();
  }
  listarMascotas();

  form.onsubmit = enviarDatos;
  btnGuardar.onclick = enviarDatos;
