document.addEventListener("DOMContentLoaded", async function () {
  const formHistorial = document.querySelector("#historialForm");
  const formEditarHistorial = document.querySelector("#formEditarHistorial");
  const listaHistorial = document.querySelector("#listaHistorial");
  const pacienteSelect = document.getElementById("pacienteSelect");
  const errorContainer = document.getElementById("errorContainer");

  $(".pacientes").select2();

  async function cargarPacientes() {
    const respuesta = await fetch(
      "../../app/controladores/PacienteController.php?action=listar"
    );
    const pacientes = await respuesta.json();

    pacientes.forEach((paciente) => {
      const option = document.createElement("option");
      option.value = paciente.id;
      option.textContent = `${paciente.nombre}`;
      pacienteSelect.appendChild(option);
    });
  }
  async function cargarHistoriales() {
    $(".tabHistorial").DataTable().destroy();
    listaHistorial.innerHTML = "";
    const historiales = await HistorialMedico.obtenerHistoriales();
    let plantilla = ``;

    historiales.forEach((historial) => {
      plantilla += `
      <tr>
        <td>${historial.id}</td>
        <td>${historial.id_paciente}</td>
        <td>${historial.nombre}</td>
        <td>${historial.telefono}</td>
        <td>${historial.motivo}</td>
        <td>${historial.diagnostico}</td>
        <td>${historial.tratamiento}</td>
        <td>${historial.notas}</td>
        <td>${historial.fecha}</td>
        <td class="d-flex justify-content-center gap-2">
          <button id='editarCliente' type="button" class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class='fa fa-pencil'></i>
          </button>
          <button class='btn btn-danger'>
            <i class='fa fa-times'></i>
          </button>
        </td>
      </tr>`;
    });

    listaHistorial.innerHTML = plantilla;
    $(".tabHistorial").DataTable({
      columnDefs: [
        { targets: [0, 1], visible: false }, // Oculta la columna 0 y 2
      ],
      order: [[8, "desc"]],
      language: {
        url: "../../public/js/mx.json",
      },
    });
  }

  document
    .getElementById("historialForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      /* let nuevoPaciente = document.getElementById("nuevo-paciente"); */

      /* Logica para cliente existente */
      if (nuevoPaciente.classList.contains("d-none")) {
        let id = null;
        const id_paciente = document.getElementById("pacienteSelect").value;
        const motivo = document.getElementById("motivo").value;
        const diagnostico = document.getElementById("diagnostico").value;
        const tratamiento = document.getElementById("tratamiento").value;
        const notas = document.getElementById("notas").value;

        const nuevoHistorial = new HistorialMedico(
          id,
          id_paciente,
          motivo,
          diagnostico,
          tratamiento,
          notas
        );

        const respuesta = await nuevoHistorial.guardar();
        if (respuesta.success) {
          alert("Historial médico guardado con éxito.");
          formHistorial.reset();
          cargarHistoriales();
          $(".pacientes").val(null).trigger("change");
          document.querySelector("#errorContainer").innerHTML = "";
          document.querySelector(".card").classList.add("d-none");
        } else {
          document.querySelector("#errorContainer").innerHTML = "";
          respuesta.errores.forEach((error) => {
            const p = document.createElement("p");
            p.textContent = error;
            p.style.color = "#fff";
            p.style.backgroundColor = "red";
            errorContainer.appendChild(p);
          });
        }
      } else {
        /* Logica para cliente nuevo */
        const nuevoPaciente = new Paciente(
          null,
          document.querySelector("#nombre").value,
          document.querySelector("#telefono").value,
          null,
          null,
          document.querySelector("#fecha_nac").value,
          document.querySelector("#ocupacion").value,
          document.querySelector("#enfermedadesC").value,
          document.querySelector("#antecedentesP").value,
          document.querySelector("#alergias").value,
          document.querySelector("#medicacion").value
        );

        const respuestaPaciente = await nuevoPaciente.guardar();
        const idPaciente = respuestaPaciente.success;

        let id = null;
        const motivo = document.getElementById("motivo").value;
        const diagnostico = document.getElementById("diagnostico").value;
        const tratamiento = document.getElementById("tratamiento").value;
        const notas = document.getElementById("notas").value;

        const nuevoHistorial = new HistorialMedico(
          id,
          idPaciente,
          motivo,
          diagnostico,
          tratamiento,
          notas
        );

        const respuestaHistorial = await nuevoHistorial.guardar();
        if (respuestaHistorial.success) {
          alert("Historial médico guardado con éxito.");
          formHistorial.reset();
          cargarHistoriales();
          $(".pacientes").val(null).trigger("change");
          document.querySelector("#errorContainer").innerHTML = "";
          document.querySelector(".card").classList.add("d-none");
        } else {
          document.querySelector("#errorContainer").innerHTML = "";
          respuestaHistorial.errores.forEach((error) => {
            const p = document.createElement("p");
            p.textContent = error;
            p.style.color = "#fff";
            p.style.backgroundColor = "red";
            errorContainer.appendChild(p);
          });
        }
      }
    });

  document
    .querySelector(".tabHistorial")
    .addEventListener("click", async (e) => {
      btnEditar = e.target.closest(".btn-warning");
      btnEliminar = e.target.closest(".btn-danger");
      if (btnEditar) {
        let row = btnEditar.closest("tr");
        let rowData = $(".tabHistorial").DataTable().row(row).data();

        document.querySelector("#idEditarHistorial").value = rowData[0];
        document.querySelector("#paciente").value = `${rowData[2]}`;
        document.querySelector("#editarMotivo").value = rowData[4];
        document.querySelector("#editarDiagnostico").value = rowData[5];
        document.querySelector("#editarTratamiento").value = rowData[6];
        document.querySelector("#editarNota").value = rowData[7];
      }
      if (btnEliminar) {
        let row = btnEliminar.closest("tr");
        let rowData = $(".tabHistorial").DataTable().row(row).data();

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
              text: "Registro de historial eliminado.",
              icon: "success",
            });

            const eliminarHistorial = new HistorialMedico(rowData[0]);
            await eliminarHistorial.eliminar();
            cargarHistoriales();
          }
        });
      }
    });

  document
    .querySelector("#formEditarHistorial")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const editarHistorial = new HistorialMedico(
        formEditarHistorial.idEditarHistorial.value,
        null,
        formEditarHistorial.editarMotivo.value,
        formEditarHistorial.editarDiagnostico.value,
        formEditarHistorial.editarTratamiento.value,
        formEditarHistorial.editarNota.value
      );

      const respuesta = await editarHistorial.editar();
      if (respuesta.success) {
        alert("Historial editado correctamente");
        formEditarHistorial.reset();
        cargarHistoriales();
        $("#staticBackdrop").modal("hide");
      } else {
        alert("Error al guardar el historial");
      }
    });

  $(".pacientes").on("change", async function () {
    let idPaciente = $(this).val();
    if (!idPaciente) return;

    if (idPaciente !== "nuevo") {
      document.querySelector(".nuevo-paciente").classList.add("d-none");
      document.querySelector(".card").classList.remove("d-none");
    } else {
      document.querySelector(".nuevo-paciente").classList.remove("d-none");
      document.querySelector(".card").classList.remove("d-none");
    }
  });

  await cargarPacientes();
  await cargarHistoriales();
});
