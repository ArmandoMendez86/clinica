document.addEventListener("DOMContentLoaded", async () => {
  const formMedico = document.getElementById("formMedico");
  const formEditarMedico = document.getElementById("formEditarMedico");
  const listaMedicos = document.getElementById("listaMedicos");

  // Cargar pacientes al cargar la página
  async function cargarMedicos() {
    $(".tabMedicos").DataTable().destroy();
    listaMedicos.innerHTML = "";
    const medicos = await Medico.obtenerTodos();
    let plantilla = ``;

    medicos.forEach((medico) => {
      plantilla += `
      <tr>
        <td>${medico.id}</td>
        <td>${medico.nombre}</td>
        <td>${medico.correo}</td>
        <td>${medico.telefono}</td>
        <td>${medico.especialidad}</td>
        <td class="d-flex justify-content-center gap-2">
          <button id='editarMedico' type="button" class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class='fa fa-pencil'></i>
          </button>
          <button class='btn btn-danger'>
            <i class='fa fa-times'></i>
          </button>
        </td>
      </tr>`;
    });

    listaMedicos.innerHTML = plantilla;
    $(".tabMedicos").DataTable({
      columnDefs: [
        { targets: [0], visible: false }, // Oculta la columna 0 y 2
      ],
      language: {
        url: "../../public/js/mx.json",
      },
    });
  }

  formMedico.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nuevoMedico = new Medico(
      (formMedico.idMedico.value = null),
      formMedico.nombre.value,
      formMedico.correo.value,
      formMedico.telefono.value,
      formMedico.especialidad.value
    );

    const respuesta = await nuevoMedico.guardar();
    if (respuesta.success) {
      alert("Medico guardado correctamente");
      formMedico.reset();
      cargarMedicos();
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

  document.querySelector(".tabMedicos").addEventListener("click", async (e) => {
    btnEditar = e.target.closest(".btn-warning");
    btnEliminar = e.target.closest(".btn-danger");
    if (btnEditar) {
      let row = btnEditar.closest("tr");
      let rowData = $(".tabMedicos").DataTable().row(row).data();
      document.querySelector("#idEditarMedico").value = rowData[0];
      document.querySelector("#editarNombreMedico").value = rowData[1];
      document.querySelector("#editarCorreoMedico").value = rowData[2];
      document.querySelector("#editarTelefonoMedico").value = rowData[3];
      document.querySelector("#editarEspecialidadMedico").value = rowData[4];
    }
    if (btnEliminar) {
      let row = btnEliminar.closest("tr");
      let rowData = $(".tabMedicos").DataTable().row(row).data();

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
            text: "Registro de medico eliminado.",
            icon: "success",
          });

          const eliminarMedico = new Medico(rowData[0]);
          await eliminarMedico.eliminar();
          cargarMedicos();
        }
      });
    }
  });

  document
    .querySelector("#formEditarMedico")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const editarMedico = new Medico(
        formEditarMedico.idEditarMedico.value,
        formEditarMedico.editarNombreMedico.value,
        formEditarMedico.editarCorreoMedico.value,
        formEditarMedico.editarTelefonoMedico.value,
        formEditarMedico.editarEspecialidadMedico.value
      );

      const respuesta = await editarMedico.editar();
      if (respuesta.success) {
        document.querySelector("#errorContainerEditar").innerHTML = ""
        alert("Medico editado correctamente");
        formEditarMedico.reset();
        cargarMedicos();
        $("#staticBackdrop").modal("hide");
      } else {
        document.querySelector("#errorContainerEditar").innerHTML = "";
        respuesta.errores.forEach((error) => {
          const p = document.createElement("p");
          p.textContent = error;
          p.style.color = "#FFF";
          p.style.backgroundColor = "red";
          document.querySelector("#errorContainerEditar").appendChild(p);
        });
      }
    });

  await cargarMedicos();
});
