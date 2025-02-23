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
        <td>${pago.diagnostico}</td>
        <td>${pago.tratamiento}</td>
        <td>${pago.notas}</td>
        <td>${pago.monto}</td>
        <td>${pago.fecha_pago}</td>
        <td>${pago.metodo_pago}</td>
        <td class="d-flex justify-content-center">
          <button class='btn btn-danger'>
            <i class='fa fa-times'></i>
          </button>
        </td>
      </tr>`;
    });

    listaPagos.innerHTML = plantilla;
    $(".tabPagos").DataTable({
      columnDefs: [
        { targets: [0], visible: false },
        { targets: [6, 7], className: "text-center" },
      ],
      language: {
        url: "../../public/js/mx.json",
      },
      footerCallback: function (row, data, start, end, display) {
        let api = this.api();

        let total = api
          .column(5, { page: "current" })
          .data()
          .reduce(function (a, b) {
            const valorA = parseFloat(a) || 0;
            const valorB = parseFloat(b) || 0;
            return valorA + valorB;
          }, 0);

        let formato = total.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        });
        $(api.column(5).footer()).html(
          "<p style='width:7rem;margin:0 auto;font-size:1.3rem;color:#378d39;'>" +
            formato +
            "</p>"
        );
      },
    });
  }

  document
    .querySelector(".tabPagos")
    .addEventListener("click", async (e) => {
      let btnEliminar = e.target.closest(".btn-danger");
     
      if (btnEliminar) {
        let row = btnEliminar.closest("tr");
        let rowData = $(".tabPagos").DataTable().row(row).data();


        Swal.fire({
          title: "Quiere eliminar?",
          text: "Esto no se podra revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Eliminado!",
              text: "Registro de pago eliminado.",
              icon: "success",
            });

            const eliminarPago = new Pago(rowData[0]);
            await eliminarPago.eliminar();
            await cargarPagos();
          }
        });
      }
    });

  

  await cargarPagos();
});
