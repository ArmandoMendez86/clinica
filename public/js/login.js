document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#ingresarLogin")
    .addEventListener("click", async () => {
      const usuario = document.querySelector("#usuario").value;
      const password = document.querySelector("#password").value;
      id = null;

      const nuevoUsuario = new Login(id, usuario, password);

      const respuesta = await nuevoUsuario.ingresar();
      if (respuesta.success == "ok") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bienvenido.",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          window.location.href = respuesta.redirect;
        }, 1600);
      }
      if (respuesta.success == "not") {
        Swal.fire({
          icon: "error",
          title: "Usuario y/o contraseña incorrecta...",
          text: "Intentalo de nuevo!",
        });
      }
    });
});
