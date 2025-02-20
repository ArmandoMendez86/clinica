class Usuario {
  constructor(id, usuario, password, perfil) {
    this.id = id;
    this.usuario = usuario;
    this.password = password;
    this.perfil = perfil;
  }

  async guardar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }

    const respuesta = await fetch(
      "../../app/controladores/UsuarioController.php?action=guardar",
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
      "../../app/controladores/UsuarioController.php?action=editar",
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
      "../../app/controladores/UsuarioController.php?action=eliminar",
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
      "../../app/controladores/UsuarioController.php?action=listar"
    );
    return await respuesta.json();
  }

  validar() {
    const errores = [];

    if (!/^[a-zA-Z]+$/.test(this.usuario)) {
      errores.push("El nombre solo puede contener letras, sin espacios.");
    }

    if (!/^[a-zA-Z0-9]+$/.test(this.apellido)) {
      errores.push(
        "El apellido solo puede contener letras y números, sin espacios."
      );
    }
    return errores;
  }
}
