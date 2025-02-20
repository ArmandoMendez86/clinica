class Cita {
  constructor(idCita, idPaciente, fechaHora, estado = "pendiente", id_historial) {
    this.idCita = idCita;
    this.idPaciente = idPaciente;
    this.fechaHora = fechaHora;
    this.estado = estado;
    this.id_historial = id_historial;
  }

  validar() {
    const errores = [];

    if (!this.idPaciente || isNaN(this.idPaciente)) {
      errores.push("Debe seleccionar un paciente válido.");
    }

    if (!this.id_historial || isNaN(this.id_historial)) {
      errores.push("Debe seleccionar un diagnostico válido.");
    }

    const fechaIngresada = new Date(this.fechaHora);
    const fechaActual = new Date();
    if (isNaN(fechaIngresada.getTime()) || fechaIngresada <= fechaActual) {
      errores.push(
        "La fecha y hora deben ser futuras y no pueden estar vacías."
      );
    }

    return errores;
  }

  async guardar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }

    const respuesta = await fetch(
      "../../app/controladores/CitaController.php?action=guardar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );

    return await respuesta.json();
  }

  static async obtenerTodas() {
    const respuesta = await fetch(
      "../../app/controladores/CitaController.php?action=listar"
    );
    return await respuesta.json();
  }

   async editar() {
    const respuesta = await fetch(
      "../../app/controladores/CitaController.php?action=editar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );

    return await respuesta.json();
  }

  async eliminar() {
    const respuesta = await fetch(
      "../../app/controladores/CitaController.php?action=eliminar",
      {
        method: "POST",
        body: JSON.stringify(this.idCita),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }
}
