document.addEventListener("DOMContentLoaded", async () => {

  const formPaciente = document.getElementById("formPaciente");
  const formEditarPaciente = document.getElementById("formEditarPaciente");
  const listaPacientes = document.getElementById("listaPacientes");

  // Cargar pacientes al cargar la página
  async function cargarPacientes() {
    $(".tabPacientes").DataTable().destroy();
    listaPacientes.innerHTML = "";
    const pacientes = await Paciente.obtenerTodos();
    let plantilla = ``;

    pacientes.forEach((paciente) => {
      plantilla += `
      <tr>
        <td>${paciente.id}</td>
        <td>${paciente.nombre}</td>
        <td>${paciente.apellido}</td>
        <td>${paciente.telefono}</td>
        <td>${paciente.email}</td>
        <td>${paciente.direccion}</td>
        <td>
          <button id='editarCliente' type="button" class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class='fa fa-pencil'></i>
          </button>
          <button class='btn btn-danger'>
            <i class='fa fa-times'></i>
          </button>
        </td>
      </tr>`;
    });

    listaPacientes.innerHTML = plantilla;
    $(".tabPacientes").DataTable({
      columnDefs: [
        { targets: [0], visible: false } // Oculta la columna 0 y 2
      ],
      language: {
        url: "../../public/js/mx.json",
      },
    });
  }

  formPaciente.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nuevoPaciente = new Paciente(
      (formPaciente.idPaciente.value = null),
      formPaciente.nombre.value,
      formPaciente.apellido.value,
      formPaciente.telefono.value,
      formPaciente.email.value,
      formPaciente.direccion.value
    );

    const respuesta = await nuevoPaciente.guardar();
    if (respuesta.success) {
      alert("Paciente guardado correctamente");
      formPaciente.reset();
      cargarPacientes();
      document.querySelector("#errorContainer").innerHTML = "";
    } else {
      document.querySelector("#errorContainer").innerHTML = "";
      respuesta.errores.forEach((error) => {
        const p = document.createElement("p");
        p.textContent = error;
        p.style.color = "#FFF";
        p.style.backgroundColor = "red";
        errorContainer.appendChild(p);
      });
    }
  });

  document
    .querySelector(".tabPacientes")
    .addEventListener("click", async (e) => {
      btnEditar = e.target.closest(".btn-warning");
      btnEliminar = e.target.closest(".btn-danger");
      if (btnEditar) {
        let row = btnEditar.closest("tr");
        let rowData = $(".tabPacientes").DataTable().row(row).data();
        document.querySelector("#idEditarPaciente").value = rowData[0];
        document.querySelector("#editarNombre").value = rowData[1];
        document.querySelector("#editarApellido").value = rowData[2];
        document.querySelector("#editarTelefono").value = rowData[3];
        document.querySelector("#editarEmail").value = rowData[4];
        document.querySelector("#editarDireccion").value = rowData[5];
      }
      if (btnEliminar) {
        let row = btnEliminar.closest("tr");
        let rowData = $(".tabPacientes").DataTable().row(row).data();

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
              text: "Registro de paciente eliminado.",
              icon: "success",
            });

            const eliminarPaciente = new Paciente(rowData[0]);
            await eliminarPaciente.eliminar();
            cargarPacientes();
          }
        });
      }
    });

  document
    .querySelector("#formEditarPaciente")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const editarPaciente = new Paciente(
        formEditarPaciente.idEditarPaciente.value,
        formEditarPaciente.editarNombre.value,
        formEditarPaciente.editarApellido.value,
        formEditarPaciente.editarTelefono.value,
        formEditarPaciente.editarEmail.value,
        formEditarPaciente.editarDireccion.value
      );

      const respuesta = await editarPaciente.editar();
      if (respuesta.success) {
        alert("Paciente editado correctamente");
        formEditarPaciente.reset();
        cargarPacientes();
        $("#staticBackdrop").modal("hide");
      } else {
        alert("Error al guardar el paciente");
      }
    });

  await cargarPacientes();
});
