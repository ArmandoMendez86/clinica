class Paciente {
  constructor(id, nombre, apellido, telefono, email, direccion) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.direccion = direccion;
  }

  async guardar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }

    const respuesta = await fetch(
      "../../app/controladores/PacienteController.php?action=guardar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }
  async editar() {
    const respuesta = await fetch(
      "../../app/controladores/PacienteController.php?action=editar",
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
      "../../app/controladores/PacienteController.php?action=eliminar",
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
      "../../app/controladores/PacienteController.php?action=listar"
    );
    return await respuesta.json();
  }

  validar() {
    const errores = [];

    if (!/^[a-zA-Z\s]+$/.test(this.nombre)) {
      errores.push("El nombre solo puede contener letras y espacios.");
    }

    if (!/^[a-zA-Z\s]+$/.test(this.apellido)) {
      errores.push("El apellido solo puede contener letras y espacios.");
    }

    if (!/^\d{8,15}$/.test(this.telefono)) {
      errores.push("El teléfono debe contener entre 8 y 15 dígitos.");
    }

    if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      errores.push("El email no es válido.");
    }

    if (this.direccion.length < 5) {
      errores.push("La dirección debe tener al menos 5 caracteres.");
    }

    return errores;
  }
}
