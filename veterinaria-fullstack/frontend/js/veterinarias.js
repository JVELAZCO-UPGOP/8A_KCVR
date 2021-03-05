const listaVeterinarias = document.getElementById('lista-veterinarias');
const pais = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const apellido = document.getElementById('apellido');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const indice = document.getElementById('indice');
const titulo = document.getElementById('exampleModalCenterTitle');
const modal = document.getElementById('exampleModalCenter');

let veterinarias = [
    {
      nombre: "Karen",
      apellido: "Vielma",
      pais: "México",
      identificacion: "1234567890"
    },
    {
        nombre: "Miguel",
        apellido: "Martinez",
        pais: "México",
        identificacion: "22334455"
      },

  ];  
  
  function listarVeterinarias() {
    const htmlVeterinarias = veterinarias.map((veterinaria, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${veterinaria.identificacion}</td>
        <td>${veterinaria.pais}</td>
        <td>${veterinaria.nombre}</td>
        <td>${veterinaria.apellido}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
      </tr>`).join("");
      listaVeterinarias.innerHTML = htmlVeterinarias;
      Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
      Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
  }
  
  function enviarDatos(evento) {
    evento.preventDefault();
    const datos = {
      nombre: nombre.value,
      apellido: apellido.value,
      pais: pais.value,
      identificacion: identificacion.value
    };
    const accion = btnGuardar.innerHTML;
    switch(accion) {
      case 'Editar':
        veterinarias[indice.value] = datos;
        break;
      default:
        veterinarias.push(datos);
        break;
    }
    listarVeterinarias();
    resetModal();
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
      pais.value = veterinaria.pais;
      identificacion.value = veterinaria.identificacion;

      $("#btn-cerrar").on("click",function() {
        indice.value = '';
        nombre.value = '';
        apellido.value = '';
        pais.value = 'País';
        identificacion.value = '';
        btnGuardar.innerHTML = 'Crear'
        titulo.innerHTML = "Nueva Veterinaria";
     });

    $("#btn-tachita").on("click",function() {
      indice.value = '';
      nombre.value = '';
      apellido.value = '';
      pais.value = 'País';
      identificacion.value = '';
      btnGuardar.innerHTML = 'Crear'
      titulo.innerHTML = "Nueva Veterinaria";
        });

    }

  }
  
  function resetModal() {
    indice.value = '';
    nombre.value = '';
    apellido.value = '';
    pais.value = 'pais';
    identificacion.value = '';
    btnGuardar.innerHTML = 'Crear'
  }
  
  function eliminar(index) {

    return function clickEnEliminar() {
      $('#exampleModalCenter2').modal('toggle');
      const veterinaria = veterinarias[index];
      indice.value = index;
      nombre.value = veterinaria.nombre;
      apellido.value = veterinaria.apellido;
      pais.value = veterinaria.pais;
      identificacion.value = veterinaria.identificacion;

      $("#btn-eliminar2").on("click",function() {
        veterinarias = veterinarias.filter((veterinaria, indice)=>indice !== index);
        listarVeterinarias();
        indice.value = '';
        nombre.value = '';
        apellido.value = '';
        pais.value = 'País';
        identificacion.value = '';
        btnGuardar.innerHTML = 'Crear'
        titulo.innerHTML = "Nueva Veterinaria";
        });

        $("#btn-cerrar2").on("click",function() {
          indice.value = '';
          nombre.value = '';
          apellido.value = '';
          pais.value = 'País';
          identificacion.value = '';
          btnGuardar.innerHTML = 'Crear'
          titulo.innerHTML = "Nueva Veterinaria";
          });

          $("#btn-tachita2").on("click",function() {
            indice.value = '';
        nombre.value = '';
        apellido.value = '';
        pais.value = 'País';
        identificacion.value = '';
        btnGuardar.innerHTML = 'Crear'
        titulo.innerHTML = "Nueva Veterinaria";
              });
          
      }
  }
  
  listarVeterinarias();
  
  form.onsubmit = enviarDatos;
  btnGuardar.onclick = enviarDatos;