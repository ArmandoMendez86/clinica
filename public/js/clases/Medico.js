class Medico {
  constructor(id, nombre, correo, telefono, especialidad) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
    this.especialidad = especialidad;
  }

  async guardar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }
    const respuesta = await fetch(
      "../../app/controladores/MedicoController.php?action=guardar",
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
      "../../app/controladores/MedicoController.php?action=editar",
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
      "../../app/controladores/MedicoController.php?action=eliminar",
      {
        method: "POST",
        body: JSON.stringify(this.id),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }

  static async obtenerTodos() {
    const respuesta = await fetch(
      "../../app/controladores/MedicoController.php?action=listar"
    );
    return await respuesta.json();
  }

  validar() {
    const errores = [];

    if (!/^[a-zA-Z.\s]+$/.test(this.nombre)) {
      errores.push("El nombre solo puede contener letras, espacios y puntos.");
    }

    if (!/^[a-zA-Z\s]+$/.test(this.especialidad)) {
      errores.push("la especialidad solo puede contener letras y espacios.");
    }

    if (!/^\d{8,15}$/.test(this.telefono)) {
      errores.push("El teléfono debe contener entre 8 y 15 dígitos.");
    }

    if (!/^\S+@\S+\.\S+$/.test(this.correo)) {
      errores.push("El correo no es válido.");
    }

    return errores;
  }
}
