class Pago {
  constructor(idPago, cita_id, monto, fecha_pago, metodo_pago) {
    this.idPago = idPago;
    this.cita_id = cita_id;
    this.monto = monto;
    this.fecha_pago = fecha_pago;
    this.metodo_pago = metodo_pago;
  }

  validar() {
    const errores = [];

    if (this.monto == "") {
      errores.push("Debe ingresar un monto válido.");
    }

    return errores;
  }

  async guardar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }

    const respuesta = await fetch(
      "../../app/controladores/PagoController.php?action=guardar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );

    return await respuesta.json();
  }

  static async obtenerTodos() {
    const respuesta = await fetch(
      "../../app/controladores/PagoController.php?action=listar"
    );
    return await respuesta.json();
  }

 /*  async editar() {
    const respuesta = await fetch(
      "../../app/controladores/CitaController.php?action=editar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );

    return await respuesta.json();
  } */

  async eliminar() {
    const respuesta = await fetch(
      "../../app/controladores/PagoController.php?action=eliminar",
      {
        method: "POST",
        body: JSON.stringify(this.idPago),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }
}
