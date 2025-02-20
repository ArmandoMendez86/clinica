document.addEventListener("DOMContentLoaded", function () {
  const selectPaciente = document.getElementById("paciente");
  const expedienteContainer = document.getElementById("expediente-container");
  const odontogramaContainer = document.getElementById("odontograma");

  $(".pacientes").select2();

  $("#paciente").on("change", async function () {
    const paciente_id = $(this).val();
    if (!paciente_id) return;
    $("#tablaHistorial").DataTable().destroy();
    $("#tablaRecetas").DataTable().destroy();
    $("#tablaCitas").DataTable().destroy();

    // Obtener expediente desde el backend
    const expediente = await Expediente.obtener(paciente_id);

    // Mostrar información general
    document.getElementById("fecha_creacion").innerText =
      expediente.fecha_creacion || "No disponible";
    document.getElementById("observaciones").innerText =
      expediente.observaciones || "No hay observaciones";

    // Mostrar la sección del expediente
    expedienteContainer.classList.remove("d-none");

    // Llenar tablas
    llenarTabla("#tablaHistorial tbody", expediente.historial);
    llenarTabla("#tablaRecetas tbody", expediente.recetas);
    llenarTabla("#tablaCitas tbody", expediente.citas);
    $("#tablaHistorial").DataTable({
      columnDefs: [
        { targets: [0, 1], visible: false },
        { targets: [2, 3, 4, 8], className: "text-center" },
      ],
      language: {
        url: "../../public/js/mx.json",
      },
    });
    $("#tablaRecetas").DataTable({
      columnDefs: [{ targets: [0, 1, 2, 4, 9], className: "text-center" }],
      language: {
        url: "../../public/js/mx.json",
      },
    });
    $("#tablaCitas").DataTable({
      columnDefs: [
        { targets: [0, 1], visible: false },
        { targets: [2, 3, 4, 5, 6, 7], className: "text-center" },
      ],
      language: {
        url: "../../public/js/mx.json",
      },
    });

    const odontograma = new Odontograma(paciente_id);
    await odontograma.cargar();
    renderizarOdontograma(odontograma.dientes);
  });

  function llenarTabla(selector, datos) {
    const tbody = document.querySelector(selector);
    tbody.innerHTML = ""; // Limpiar contenido previo
    datos.forEach((item) => {
      const fila = document.createElement("tr");
      Object.values(item).forEach((valor) => {
        const celda = document.createElement("td");
        celda.textContent = valor;
        fila.appendChild(celda);
      });
      tbody.appendChild(fila);
    });
  }

  function renderizarOdontograma(dientes) {
    odontogramaContainer.innerHTML = "";
    for (let i = 0; i < 32; i++) {
      const diente = document.createElement("div");
      diente.classList.add("diente");
      diente.textContent = i + 1;

      // Aplicar clases de estado
      if (dientes[i].estado === "caries") diente.classList.add("caries");
      if (dientes[i].estado === "extraido") diente.classList.add("extraido");

      diente.addEventListener("click", () => {
        mostrarFormularioEdicion(dientes[i], i);
      });

      odontogramaContainer.appendChild(diente);
    }
  }

  function mostrarFormularioEdicion(diente, index) {
    // Actualizar el contenido del modal con la información del diente
    document.getElementById("modalEdicionLabel").textContent = `Diente # ${
      index + 1
    }`;
    document.getElementById("estado").value = diente.estado;
    document.getElementById("tratamiento").value = diente.tratamiento;
    document.getElementById("fechaUltimoTratamiento").value =
      diente.fechaUltimoTratamiento || "";
    document.getElementById("notas").value = diente.notas;

    // Mostrar el modal de Bootstrap
    const modal = new bootstrap.Modal(document.getElementById("modalEdicion"));
    modal.show();
  }
});
