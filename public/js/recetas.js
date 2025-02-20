document.addEventListener("DOMContentLoaded", () => {
  let tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  let tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  const formReceta = document.querySelector("#formReceta");
  const listaRecetas = document.querySelector("#listaRecetas");
  $(".pacientes").select2();
  $(".medicos").select2();

  // Cargar pacientes en el select
  async function cargarPacientes() {
    const pacientes = await Paciente.obtenerTodos();

    const selectPaciente = document.getElementById("paciente");
    selectPaciente.innerHTML = "<option>Seleccionar Paciente</option>";
    pacientes.forEach((paciente) => {
      const option = document.createElement("option");
      option.value = paciente.id;
      option.textContent = `${paciente.nombre} ${paciente.apellido}`;
      selectPaciente.appendChild(option);
    });
  }
  async function cargarMedicos() {
    const medicos = await Medico.obtenerTodos();

    const selectMedico = document.getElementById("medico");
    selectMedico.innerHTML = "<option>Seleccionar Medico</option>";
    medicos.forEach((medico) => {
      const option = document.createElement("option");
      option.value = medico.id;
      option.textContent = `${medico.nombre}`;
      selectMedico.appendChild(option);
    });
  }
  async function cargarDiagnosticos(id_paciente) {
    const diagnosticos = await HistorialMedico.obtenerPorPaciente(id_paciente);

    const selectDiagnostico = document.getElementById("diagnostico");
    selectDiagnostico.innerHTML = "<option>Seleccionar Diagnostico</option>";
    diagnosticos.forEach((registro) => {
      const option = document.createElement("option");
      option.value = registro.id;
      option.textContent = `${registro.diagnostico}`;
      selectDiagnostico.appendChild(option);
    });
  }

  async function cargarTabRecetas() {
    $(".tabRecetas").DataTable().destroy();
    listaRecetas.innerHTML = "";
    const recetas = await Receta.obtenerTodas();
    let plantilla = ``;

    recetas.forEach((receta) => {
      plantilla += `
        <tr>
          <td>${receta.nombre}</td>
          <td>${receta.apellido}</td>
          <td>${receta.telefono}</td>
          <td>${receta.doctor}</td>
          <td>${receta.especialidad}</td>
          <td>${receta.medicamentos}</td>
          <td>${receta.dosis}</td>
          <td>${receta.indicaciones}</td>
          <td>${receta.diagnostico}</td>
          <td>${receta.fecha}</td>
          <td class="d-flex justify-content-center">
            <button id='generarReceta' type="button" class='btn btn-warning' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title='Imprimir Receta'>
            <i class="fa fa-file-text" aria-hidden="true"></i>
            </button>
          </td>
        </tr>`;
    });

    listaRecetas.innerHTML = plantilla;
    $(".tabRecetas").DataTable({
      columnDefs: [
        { targets: [2, 5, 6, 7], visible: false }, // Oculta la columna 0 y 2
      ],
      language: {
        url: "../../public/js/mx.json",
      },
    });

    // 🔥 Reinicializa tooltips después de cargar la tabla
    let newTooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    newTooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
  }

  // Guardar receta
  document
    .getElementById("formReceta")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const nuevaReceta = new Receta(
        (formReceta.idReceta.value = null),
        formReceta.paciente.value,
        formReceta.medico.value,
        formReceta.fecha.value,
        formReceta.medicamentos.value,
        formReceta.dosis.value,
        formReceta.indicaciones.value,
        formReceta.diagnostico.value
      );

    

      const respuesta = await nuevaReceta.guardar();
      if (respuesta.success) {
        alert("Receta guardada correctamente");
        formReceta.reset();
        cargarTabRecetas();
        document.querySelector("#errorContainer").innerHTML = "";
        $(".pacientes").val(null).trigger("change");
        $(".medicos").val(null).trigger("change");
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

  $(".pacientes").on("change", function () {
    var id_paciente = $(this).val();
    if (!id_paciente) return;
    cargarDiagnosticos(id_paciente);
  });

  /*   document.querySelector("#paciente").addEventListener("change", (e) => {
    cargarDiagnosticos(document.querySelector("#paciente").value);
  }); */

  document.querySelector(".tabRecetas").addEventListener("click", async (e) => {
    const generarReceta = e.target.closest(".btn-warning");
    if (generarReceta) {
      const row = e.target.closest("tr");
      let rowData = $(".tabRecetas").DataTable().row(row).data();
      const fecha = new Date().toLocaleDateString();

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Cargar logo
      const logo = await loadImage(
        "https://st5.depositphotos.com/30378076/64982/v/450/depositphotos_649821264-stock-illustration-dentist-logo-dental-clinic-icon.jpg"
      );
      doc.addImage(logo, "PNG", 15, 1, 40, 40);

      // Encabezado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Clínica Dental", 105, 20, null, null, "center");

      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.text("Receta Médica", 105, 28, null, null, "center");

      doc.setLineWidth(0.5);
      doc.line(15, 35, 195, 35);

      // Información del Médico y Fecha
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Médico: ${rowData[3]}`, 15, 45);
      doc.text(`Fecha: ${fecha}`, 160, 45);

      // Datos del Paciente
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Datos del Paciente:", 15, 60);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Nombre: ${rowData[0]} ${rowData[1]}`, 15, 70);
      doc.text(`Diagnóstico: ${rowData[8]}`, 15, 80);

      // Sección de Medicamentos
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Prescripción Médica:", 15, 95);

      // Crear Tabla de Medicamentos
      const startX = 15;
      const startY = 105;
      const rowHeight = 10;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 15;
      const availableWidth = pageWidth - margin * 2;
      const colWidths = [
        availableWidth * 0.3,
        availableWidth * 0.2,
        availableWidth * 0.5,
      ];

      // Encabezados de la tabla
      doc.setTextColor(0);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Medicamento", startX + 5, startY + 7);
      doc.text("Dosis", startX + colWidths[0] + 5, startY + 7);
      doc.text(
        "Indicaciones",
        startX + colWidths[0] + colWidths[1] + 5,
        startY + 7
      );

      // Datos de la tabla con ajuste de texto
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      let medicamento = doc.splitTextToSize(rowData[5], colWidths[0] - 5);
      let dosis = doc.splitTextToSize(rowData[6], colWidths[1] - 5);
      let indicaciones = doc.splitTextToSize(rowData[7], colWidths[2] - 5);

      let maxLines = Math.max(
        medicamento.length,
        dosis.length,
        indicaciones.length
      );
      let adjustedHeight = rowHeight * maxLines;

      doc.text(medicamento, startX + 5, startY + rowHeight + 7);
      doc.text(dosis, startX + colWidths[0] + 5, startY + rowHeight + 7);
      doc.text(
        indicaciones,
        startX + colWidths[0] + colWidths[1] + 5,
        startY + rowHeight + 7
      );

      // Dibujar bordes ajustados a la altura de los textos
      doc.rect(startX, startY + rowHeight, colWidths[0], adjustedHeight);
      doc.rect(
        startX + colWidths[0],
        startY + rowHeight,
        colWidths[1],
        adjustedHeight
      );
      doc.rect(
        startX + colWidths[0] + colWidths[1],
        startY + rowHeight,
        colWidths[2],
        adjustedHeight
      );

      // Espacio para firma
      doc.line(
        120,
        startY + adjustedHeight + 40,
        190,
        startY + adjustedHeight + 40
      );
      doc.text("Firma del Médico", 135, startY + adjustedHeight + 50);

      // Guardar PDF
      doc.save(`Receta_${rowData[0]}.pdf`);
    }
  });

  // Función para cargar imagen de logo desde URL
  function loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
    });
  }

  cargarPacientes();
  cargarMedicos();
  cargarDiagnosticos();
  cargarTabRecetas();
});
