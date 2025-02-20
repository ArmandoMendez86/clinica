document.addEventListener("DOMContentLoaded", async () => {
  const formCita = document.getElementById("formCita");
  const formEditarCita = document.getElementById("formEditarCita");
  const listaCitas = document.getElementById("listaCitas");
  const errorCitaContainer = document.getElementById("errorCitaContainer");
  const errorPagoContainer = document.getElementById("errorPagoContainer");
  $(".misPacientes").select2();

  async function cargarCitas() {
    $(".tabCitas").DataTable().destroy();
    listaCitas.innerHTML = "";
    const citas = await Cita.obtenerTodas();
    let plantilla = ``;

    citas.forEach((cita) => {
      plantilla += `
      <tr>
        <td>${cita.id}</td>
        <td>${cita.id_cliente}</td>
        <td>${cita.nombre}</td>
        <td>${cita.apellido}</td>
        <td>${cita.email}</td>
        <td>${cita.telefono}</td>
        <td>${cita.fecha_hora}</td>
        <td>${cita.id_historial}</td>
        <td>${cita.motivo}</td>
        <td>${cita.estado}</td>
        <td>
          <button id='editarCita' type="button" class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class='fa fa-pencil'></i>
          </button>
          <button class='btn btn-danger'>
            <i class='fa fa-times'></i>
          </button>
        </td>
      </tr>`;
    });

    listaCitas.innerHTML = plantilla;
    $(".tabCitas").DataTable({
      columnDefs: [
        { targets: [0, 1, 7], visible: false }, // Oculta la columna 0 y 2
      ],
      language: {
        url: "../../public/js/mx.json",
      },
    });
  }

  formCita.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorCitaContainer.innerHTML = "";

    const nuevaCita = new Cita(
      (formCita.idCita.value = null),
      formCita.id_paciente.value,
      formCita.fecha_hora.value,
      undefined,
      formCita.idHistorial.value
    );

    const respuesta = await nuevaCita.guardar();

    if (respuesta.success) {
      alert("Cita guardada correctamente");
      formCita.reset();
      cargarCitas();
    } else {
      respuesta.errores.forEach((error) => {
        const p = document.createElement("p");
        p.textContent = error;
        p.style.color = "#fff";
        p.style.backgroundColor = "red";
        errorCitaContainer.appendChild(p);
      });
    }
  });

  document.querySelector(".tabCitas").addEventListener("click", async (e) => {
    btnEditar = e.target.closest(".btn-warning");
    btnEliminar = e.target.closest(".btn-danger");

    if (btnEditar) {
      let row = btnEditar.closest("tr");
      let rowData = $(".tabCitas").DataTable().row(row).data();

      const selectPacientes = document.getElementById("editarIdPaciente");
      const pacientes = await Paciente.obtenerTodos();
      pacientes.forEach((paciente) => {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = `${paciente.nombre} ${paciente.apellido}`;
        selectPacientes.appendChild(option);
      });

      document.querySelector("#idEditarCita").value = rowData[0];
      document.querySelector("#editarIdPaciente").value = rowData[1];
      document.querySelector("#editarFechaHora").value = rowData[6];
      document.querySelector("#editarEstado").value = rowData[9];
      await cargarEditarHistorialPaciente(
        document.querySelector("#editarIdPaciente").value,
        "editarMotivo"
      );
      document.querySelector("#editarMotivo").value = rowData[7];

      if (document.querySelector("#editarEstado").value == "completada") {
        document.querySelector("#editarEstado").setAttribute("disabled", true);
        document
          .querySelector("#editarFechaHora")
          .setAttribute("disabled", true);
      } else {
        document.querySelector("#editarEstado").removeAttribute("disabled");
        document.querySelector("#editarFechaHora").removeAttribute("disabled");
      }
    }

    if (btnEliminar) {
      let row = btnEliminar.closest("tr");
      let rowData = $(".tabCitas").DataTable().row(row).data();

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
            text: "Registro de cita eliminado.",
            icon: "success",
          });

          const eliminarCita = new Cita(rowData[0]);
          await eliminarCita.eliminar();
          cargarCitas();
        }
      });
    }
  });

  async function cargarPacientes() {
    const selectPacientes = document.getElementById("id_paciente");
    selectPacientes.innerHTML =
      '<option value="">Seleccione un paciente</option>';
    const pacientes = await Paciente.obtenerTodos();
    pacientes.forEach((paciente) => {
      const option = document.createElement("option");
      option.value = paciente.id;
      option.textContent = `${paciente.nombre} ${paciente.apellido}`;
      selectPacientes.appendChild(option);
    });
    return pacientes;
  }

  async function cargarHistorialPaciente(id_paciente, selector) {
    const selectHistorialMedico = document.getElementById(selector);
    selectHistorialMedico.innerHTML =
      '<option value="">Seleccione un historial</option>';
    const historialPaciente = await HistorialMedico.obtenerPorPaciente(
      id_paciente
    );
    historialPaciente.forEach((historial) => {
      const option = document.createElement("option");
      option.value = historial.id;
      option.textContent = `${historial.diagnostico} - ${historial.tratamiento}`;
      selectHistorialMedico.appendChild(option);
    });
    return historialPaciente;
  }

  async function cargarEditarHistorialPaciente(id_paciente, selector) {
    const selectHistorialMedico = document.getElementById(selector);
    selectHistorialMedico.innerHTML =
      '<option value="">Seleccione un historial</option>';
    const historialPaciente = await HistorialMedico.obtenerPorPaciente(
      id_paciente
    );
    historialPaciente.forEach((historial) => {
      const option = document.createElement("option");
      option.value = historial.id;
      option.textContent = `${historial.diagnostico} - ${historial.tratamiento}`;
      selectHistorialMedico.appendChild(option);
    });
    return historialPaciente;
  }

  document
    .querySelector("#formEditarCita")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const editarCita = new Cita(
        formEditarCita.idEditarCita.value,
        formEditarCita.editarIdPaciente.value,
        formEditarCita.editarFechaHora.value,
        formEditarCita.editarEstado.value,
        formEditarCita.editarMotivo.value
      );

      const respuesta = await editarCita.editar();
      if (respuesta.success) {
        alert("Cita editada correctamente");
        formEditarCita.reset();
        cargarCitas();
        $("#staticBackdrop").modal("hide");
      } else {
        alert("Error al editar cita");
      }
    });

  $("#id_paciente").on("change", function () {
    const id_paciente = $(this).val();
    if (!id_paciente) return;
    cargarHistorialPaciente(id_paciente, "idHistorial");
  });

  $("#editarEstado").on("change", function () {
    const estado = $(this).val();
    if (estado !== "completada") return;

    $("#staticBackdropPago").modal("show");
  });

  document.querySelector("#formPago").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoPago = new Pago(
      (document.querySelector("#idPago").value = null),
      formEditarCita.idEditarCita.value,
      document.querySelector("#monto").value,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      document.querySelector("#tipoPago").value
    );

    const respuesta = await nuevoPago.guardar();
    if (respuesta.success) {
      alert("Pago registrado correctamente");
      document.querySelector("#formPago").reset();
      errorPagoContainer.innerHTML = "";

      const editarCita = new Cita(
        formEditarCita.idEditarCita.value,
        formEditarCita.editarIdPaciente.value,
        formEditarCita.editarFechaHora.value,
        formEditarCita.editarEstado.value,
        formEditarCita.editarMotivo.value
      );

      const respuesta = await editarCita.editar();
      if (respuesta.success) {
        formEditarCita.reset();
        cargarCitas();
      } else {
        alert("Error al editar cita");
      }
      $("#staticBackdrop").modal("hide");
      $("#staticBackdropPago").modal("hide");
    } else {
      errorPagoContainer.innerHTML = "";
      respuesta.errores.forEach((error) => {
        const p = document.createElement("p");
        p.textContent = error;
        p.style.color = "#FFF";
        p.style.backgroundColor = "red";
        errorPagoContainer.appendChild(p);
      });
    }
  });

  document.querySelector("#cancelarPago").addEventListener("click", () => {
    $("#staticBackdrop").modal("hide");
  });

  document.addEventListener("hidden.bs.modal", function (event) {
    if (event.target.id === "staticBackdrop") {
      document.querySelector('input[id^="dt-search"]').focus();
    }
    if (event.target.id === "staticBackdropPago") {
      document.querySelector('input[id^="dt-search"]').focus();
    }
  });

  cargarCitas();
  cargarPacientes();
});
