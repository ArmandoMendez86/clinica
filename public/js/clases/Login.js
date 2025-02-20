class Login {
  constructor(id, usuario, password) {
    this.id = id;
    this.usuario = usuario;
    this.password = password;
  }

  async ingresar() {
    const respuesta = await fetch(
      "app/controladores/LoginController.php?action=ingresar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }
 
}
