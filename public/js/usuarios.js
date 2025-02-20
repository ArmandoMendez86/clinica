document.addEventListener("DOMContentLoaded", async () => {
  const formUsuario = document.getElementById("formUsuario");
  const formEditarUsuario = document.getElementById("formEditarUsuario");
  const listaUsuarios = document.getElementById("listaUsuarios");

  // Cargar pacientes al cargar la página
  async function cargarUsuarios() {
    $(".tabUsuarios").DataTable().destroy();
    listaUsuarios.innerHTML = "";
    const usuarios = await Usuario.obtenerTodos();
    let plantilla = ``;

    usuarios.forEach((usuario) => {
      plantilla += `
      <tr>
        <td>${usuario.id}</td>
        <td>${usuario.usuario}</td>
        <td>${usuario.perfil}</td>
        <td>
          <button type="button" class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class='fa fa-pencil'></i>
          </button>
          <button class='btn btn-danger'>
            <i class='fa fa-times'></i>
          </button>
        </td>
      </tr>`;
    });

    listaUsuarios.innerHTML = plantilla;
    $(".tabUsuarios").DataTable({
      columnDefs: [
        { targets: [0], visible: false },
        { targets: [2,3], className: "text-center" },
      ],
      language: {
        url: "../../public/js/mx.json",
      },
    });
  }

  formUsuario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nuevoUsuario = new Usuario(
      (formUsuario.idUsuario.value = null),
      formUsuario.usuario.value,
      formUsuario.password.value,
      formUsuario.perfil.value
    );


    const respuesta = await nuevoUsuario.guardar();
    if (respuesta.success) {
      alert("Usuario guardado correctamente");
      formUsuario.reset();
      cargarUsuarios();
      document.querySelector("#errorContainer").innerHTML = "";
    } else {
      document.querySelector("#errorContainer").innerHTML = "";
      respuesta.errores.forEach((error) => {
        const p = document.createElement("p");
        p.textContent = error;
        p.style.color = "#FFF";
        p.style.backgroundColor = "red";
        document.querySelector("#errorContainer").appendChild(p);
      });
    }
  });

  document
    .querySelector(".tabUsuarios")
    .addEventListener("click", async (e) => {
      btnEditar = e.target.closest(".btn-warning");
      btnEliminar = e.target.closest(".btn-danger");
      if (btnEditar) {
        let row = btnEditar.closest("tr");
        let rowData = $(".tabUsuarios").DataTable().row(row).data();
        console.log(rowData)
        document.querySelector("#idEditarUsuario").value = rowData[0];
        document.querySelector("#editarUsuario").value = rowData[1];
        document.querySelector("#editarPerfil").value = rowData[2];
      }
      if (btnEliminar) {
        let row = btnEliminar.closest("tr");
        let rowData = $(".tabUsuarios").DataTable().row(row).data();

        Swal.fire({
          title: "Quiere eliminar?",
          text: "Esto no se podra revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Eliminado!",
              text: "Registro de usuario eliminado.",
              icon: "success",
            });

            const eliminarUsuario = new Usuario(rowData[0]);
            await eliminarUsuario.eliminar();
            cargarUsuarios();
          }
        });
      }
    });

  document
    .querySelector("#formEditarUsuario")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const editarUsuario = new Usuario(
        formEditarUsuario.idEditarUsuario.value,
        formEditarUsuario.editarUsuario.value,
        formEditarUsuario.editarPassword.value,
        formEditarUsuario.editarPerfil.value
      );


      const respuesta = await editarUsuario.editar();
      if (respuesta.success) {
        alert("Usuario editado correctamente");
        formEditarUsuario.reset();
        cargarUsuarios();
        $("#staticBackdrop").modal("hide");
      } else {
        alert("Error al guardar el usuario");
      }
    });

  await cargarUsuarios();
});
