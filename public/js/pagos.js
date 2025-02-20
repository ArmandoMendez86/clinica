document.addEventListener("DOMContentLoaded", async () => {


  async function cargarPagos() {
    $(".tabPagos").DataTable().destroy();
    listaPagos.innerHTML = "";
    const pagos = await Pago.obtenerTodos();
    let plantilla = ``;

    pagos.forEach((pago) => {
      plantilla += `
      <tr>
        <td>${pago.id}</td>
        <td>${pago.nombre}</td>
        <td>${pago.apellido}</td>
        <td>${pago.diagnostico}</td>
        <td>${pago.tratamiento}</td>
        <td>${pago.notas}</td>
        <td>${pago.monto}</td>
        <td>${pago.fecha_pago}</td>
        <td>${pago.metodo_pago}</td>
      </tr>`;
    });

    listaPagos.innerHTML = plantilla;
    $(".tabPagos").DataTable({
      columnDefs: [
        { targets: [0], visible: false },
        {targets: [6,7,8], className: "text-center"} 

      ],
      language: {
        url: "../../public/js/mx.json",
      },
      footerCallback: function (row, data, start, end, display) {
        let api = this.api();
    
        let total = api
          .column(6, { page: "current" })
          .data()
          .reduce(function (a, b) {
            // Convertir a número, o usar 0 si no es un número
            const valorA = parseFloat(a) || 0;
            const valorB = parseFloat(b) || 0;
            return valorA + valorB;
          }, 0);
    
        let formato = total.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        });
        $(api.column(6).footer()).html(
          "<p style='width:7rem;margin:0 auto;font-size:1.3rem;color:#378d39;'>" +
            formato +
            "</p>"
        );
      },
    });
  }


  await cargarPagos();
});
