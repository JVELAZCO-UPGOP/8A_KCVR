const listaVeterinarias = document.getElementById('lista-veterinarias');
const nombre = document.getElementById('nombre');
const documento = document.getElementById('documento');
const apellido = document.getElementById('apellido');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const indice = document.getElementById('indice');
const titulo = document.getElementById('exampleModalCenterTitle');
const modal = document.getElementById('exampleModalCenter');
const url = "https://veterinaria-backend-sable.vercel.app/veterinarias";
let veterinarias = [];

async function listarVeterinarias() {
  try {
    const respuesta = await fetch(url);
    const veterinariasDelServer = await respuesta.json();
    if (Array.isArray(veterinariasDelServer)) {
      veterinarias = veterinariasDelServer;
    }
    if (veterinarias.length > 0) {
      const htmlVeterinarias = veterinarias
        .map(
          (veterinaria, index) => `<tr>
        <th scope="row">${index}</th>
        <td>${veterinaria.documento}</td>
        <td>${veterinaria.nombre}</td>
        <td>${veterinaria.apellido}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
      </tr>`
        )
        .join("");
      listaVeterinarias.innerHTML = htmlVeterinarias;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
      Array.from(document.getElementsByClassName("eliminar")).forEach(
        (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
      );
      return;
    }
    listaVeterinarias.innerHTML = `<tr>
    <td colspan="5" class="lista-vacia">No hay veterinarias</td>
  </tr>`;
  } catch (error) {
    console.log({ error });
    $(".alert").show();

  
  }
}
  
  async function enviarDatos(evento) {
    evento.preventDefault();
    try {
      const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        documento: documento.value,
      };
      const accion = btnGuardar.innerHTML;
      let urlEnvio = url;
      let method = "POST";
      if (accion === "Editar") {
        urlEnvio += `/${indice.value}`;
        method = "PUT";
      }
      const respuesta = await fetch(urlEnvio, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
        mode: "cors",
      });
      if (respuesta.ok) {
        listarVeterinarias();
        resetModal();
      }
    } catch (error) {
      console.log({ error });
      $(".alert").show();
    }
  }
  
  function editar(index) {
    return function cuandoCliqueo() {
      btnGuardar.innerHTML = 'Editar'
      titulo.innerHTML = "Editar Veterinaria";
      $('#exampleModalCenter').modal('toggle');
      const veterinaria = veterinarias[index];
      indice.value = index;
      nombre.value = veterinaria.nombre;
      apellido.value = veterinaria.apellido;
      documento.value = veterinaria.documento;

      $("#btn-cerrar").on("click",function() {
        indice.value = '';
        nombre.value = '';
        apellido.value = '';
        documento.value = '';
        btnGuardar.innerHTML = 'Crear'
        titulo.innerHTML = "Nueva Veterinaria";
     });

    $("#btn-tachita").on("click",function() {
      indice.value = '';
      nombre.value = '';
      apellido.value = '';
      documento.value = '';
      btnGuardar.innerHTML = 'Crear'
      titulo.innerHTML = "Nueva Veterinaria";
        });

    }

  }
  
  function resetModal() {
    indice.value = '';
    nombre.value = '';
    apellido.value = '';
    documento.value = '';
    btnGuardar.innerHTML = 'Crear'
  }
  
  function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {
      var respuesta = confirm("¿Desea eliminar la veterinaria seleccionada?");
      try {
            const respuesta = await fetch(urlEnvio, {
            method: "DELETE",
            });
            if (respuesta.ok) {
               listarVeterinarias();
               resetModal();
              }
            else
            {
             return false;
            }
           } catch (error) {
            console.log({ error });
            $(".alert").show();
           }
         }       
  }
  
  listarVeterinarias();
  
  form.onsubmit = enviarDatos;
  btnGuardar.onclick = enviarDatos;