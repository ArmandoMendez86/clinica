class Odontograma {
  constructor(idPaciente) {
    this.idPaciente = idPaciente;
    this.dientes = [];
  }

  async cargar() {
    const response = await fetch(
      `../../app/controladores/OdontogramaController.php?action=cargar&idPaciente=${this.idPaciente}`
    );
    const data = await response.json();

    // Verificar si se cargaron los dientes desde la base de datos
    if (data.success && data.dientes.length > 0) {
      // Si hay dientes, cargarlos con los datos de la base de datos
      this.dientes = data.dientes.map((diente, index) => ({
        id: index + 1,
        estado: diente.estado || "sano",
        tratamiento: diente.tratamiento || "Ninguno",
        fechaUltimoTratamiento: diente.fechaUltimoTratamiento || null,
        notas: diente.notas || "",
        ubicacion: diente.ubicacion || "",
      }));
    } else {
      // Si no hay odontograma registrado, inicializar los dientes con valores por defecto
      this.dientes = Array.from({ length: 32 }, (_, index) => ({
        id: index + 1,
        estado: "sano", // Estado por defecto
        tratamiento: "Ninguno", // Tratamiento por defecto
        fechaUltimoTratamiento: null, // Sin fecha de tratamiento por defecto
        notas: "", // Sin notas por defecto
        ubicacion: "", // Sin ubicación por defecto
      }));
    }
  }

  async guardar() {
    const response = await fetch(
      "../../app/controladores/OdontogramaController.php?action=guardar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPaciente: this.idPaciente,
          dientes: this.dientes,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      alert("Odontograma guardado correctamente.");
    }
  }

  marcarDiente(index, estado) {
    // Marcar el estado de un diente
    const diente = this.dientes[index];
    diente.estado = estado;
  }
}
