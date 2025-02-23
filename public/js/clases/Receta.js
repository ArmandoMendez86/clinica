class Receta {
  constructor(
    id,
    paciente_id,
    medico_id,
    fecha,
    medicamentos,
    dosis,
    indicaciones,
    historial_id
  ) {
    this.id = id;
    this.paciente_id = paciente_id;
    this.medico_id = medico_id;
    this.fecha = fecha;
    this.medicamentos = medicamentos;
    this.dosis = dosis;
    this.indicaciones = indicaciones;
    this.historial_id = historial_id;
  }

  validar() {
    const errores = [];

    if (!this.paciente_id || isNaN(this.paciente_id)) {
      errores.push("Debe seleccionar un paciente.");
    }
    if (!this.medico_id || isNaN(this.medico_id)) {
      errores.push("Debe seleccionar un medico.");
    }
    if (!this.historial_id || isNaN(this.historial_id)) {
      errores.push("Debe seleccionar un diagnostico.");
    }
    if (!this.medicamentos) {
      errores.push("Ingrese el medicamento necesario.");
    }
    if (!this.dosis) {
      errores.push("Ingrese las dosis requeridas.");
    }

    const fechaIngresada = new Date(this.fecha);

    if (isNaN(fechaIngresada.getTime())) {
      errores.push("Debe ingresar la fecha.");
    }

    return errores;
  }

  // Método para guardar una receta
  async guardar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }
    const respuesta = await fetch(
      "../../app/controladores/RecetaController.php?action=guardar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }

  // Método para obtener todas las recetas
  static async obtenerTodas() {
    const respuesta = await fetch(
      "../../app/controladores/RecetaController.php?action=listar"
    );
    return await respuesta.json();
  }

  // Método para obtener las recetas de un paciente específico
  static async obtenerPorPaciente(paciente_id) {
    const respuesta = await fetch(
      "../../app/controladores/RecetaController.php?action=listarPorPaciente",
      {
        method: "POST",
        body: JSON.stringify({ paciente_id }),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }

  async eliminar() {
    const respuesta = await fetch(
      "../../app/controladores/RecetaController.php?action=eliminar",
      {
        method: "POST",
        body: JSON.stringify(this.id),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }

}
