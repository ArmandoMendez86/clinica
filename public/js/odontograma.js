document.addEventListener("DOMContentLoaded", () => {
  const odontogramaContainer = document.getElementById("odontograma");
  const pacienteSelect = document.getElementById("paciente");
  $(".pacientes").select2();
  let odontograma;

  $(".pacientes").on("change", async function () {
    let idPaciente = $(this).val();
    if (!idPaciente) return;

    odontograma = new Odontograma(idPaciente);
    await odontograma.cargar();
    renderizarOdontograma(odontograma.dientes);
  });

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
        // Al hacer clic, mostrar el modal con el formulario para editar los detalles del diente
        mostrarFormularioEdicion(dientes[i], i);
      });

      odontogramaContainer.appendChild(diente);
    }
  }

  function mostrarFormularioEdicion(diente, index) {
    // Actualizar el contenido del modal con la información del diente
    document.getElementById(
      "modalEdicionLabel"
    ).textContent = `Editar diente: ${index + 1}`;
    document.getElementById("estado").value = diente.estado;
    document.getElementById("tratamiento").value = diente.tratamiento;
    document.getElementById("fechaUltimoTratamiento").value =
      diente.fechaUltimoTratamiento || "";
    document.getElementById("notas").value = diente.notas;

    // Mostrar el modal de Bootstrap
    const modal = new bootstrap.Modal(document.getElementById("modalEdicion"));
    modal.show();

    document.getElementById("guardarEdicion").addEventListener("click", () => {
      diente.estado = document.getElementById("estado").value;
      diente.tratamiento = document.getElementById("tratamiento").value;
      diente.fechaUltimoTratamiento = document.getElementById(
        "fechaUltimoTratamiento"
      ).value;
      diente.notas = document.getElementById("notas").value;

      odontograma.marcarDiente(index, diente.estado);
      renderizarOdontograma(odontograma.dientes);

      modal.hide();
    });
  }

  document
    .getElementById("guardarOdontograma")
    .addEventListener("click", async () => {
      if (!odontograma) return;
      await odontograma.guardar();
    });

  //------------------------------------ACTIVACION DE PAGINA-------------------------//

  let pagina = window.location.pathname.split("/").pop();
  if (pagina === "odontograma.php") {
    document.querySelector("#odontogramas").setAttribute("checked", true);
  }

  document.querySelector("#menuBotoom").addEventListener("click", (e) => {
    if (e.target.id == "pacientes") {
      window.location.href = "pacientes.php";
    } else if (e.target.id == "medicos") {
      window.location.href = "medicos.php";
    } else if (e.target.id == "citas") {
      window.location.href = "citas.php";
    } else if (e.target.id == "recetas") {
      window.location.href = "recetas.php";
    } else if (e.target.id == "odontogramas") {
      window.location.href = "odontograma.php";
    } else if (e.target.id == "historial") {
      window.location.href = "historial.php";
    } else if (e.target.id == "expediente") {
      window.location.href = "expediente.php";
    } else if (e.target.id == "pagos") {
      window.location.href = "pagos.php";
    } else if (e.target.id == "usuarios") {
      window.location.href = "usuarios.php";
    }
  });
});
