class HistorialMedico {
  constructor(id, id_paciente, motivo, diagnostico, tratamiento, notas) {
    this.id = id;
    this.id_paciente = id_paciente;
    this.motivo = motivo;
    this.diagnostico = diagnostico;
    this.tratamiento = tratamiento;
    this.notas = notas;
  }

  static async obtenerHistoriales() {
    const respuesta = await fetch(
      "../../app/controladores/HistorialMedicoController.php?action=listar"
    );
    return await respuesta.json();
  }

  async guardar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }

    const respuesta = await fetch(
      "../../app/controladores/HistorialMedicoController.php?action=guardar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }

  async editar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }

    const respuesta = await fetch(
      "../../app/controladores/HistorialMedicoController.php?action=editar",
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
      "../../app/controladores/HistorialMedicoController.php?action=eliminar",
      {
        method: "POST",
        body: JSON.stringify(this.id),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }

  static async obtenerPorPaciente(id_paciente) {
    const respuesta = await fetch(
      `../../app/controladores/HistorialMedicoController.php?action=diagnosticopaciente&id_paciente=${id_paciente}`
    );
    return await respuesta.json();
  }

  validar() {
    const errores = [];

    if (!this.id_paciente) {
      errores.push("Debes seleccionar un paciente.");
    }
    if (!this.motivo.trim()) {
      errores.push("El motivo es obligatorio.");
    }
    if (!this.diagnostico.trim()) {
      errores.push("El diagnóstico es obligatorio.");
    }
    return errores;
  }
}
