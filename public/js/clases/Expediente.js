class Expediente {
  static async obtener(paciente_id) {
    let respuesta = await fetch(
      `../../app/controladores/ExpedienteController.php?action=listarPorPaciente`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paciente_id: paciente_id }),
      }
    );
    return await respuesta.json();
  }

  async guardar(observaciones) {
    const respuesta = await fetch(
      "../../app/controladores/ExpedienteController.php?action=guardar",
      {
        method: "POST",
        body: JSON.stringify({ paciente_id: this.paciente_id, observaciones }),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
}

}
