<?php
include_once "../incluir/auth.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Pagos</title>
    <link rel="stylesheet" href="../../public/css/datatables.css">
    <link rel="stylesheet" href="../../public/css/fontawesome4.7.css">
    <link rel="stylesheet" href="../../public/css/bootstrap5.2.css">
    <link rel="stylesheet" href="../../public/css/main.css">

</head>

<body class="p-5 w-100">

<h1 class="fs-4 text-center">Gestión de Pagos</h1>

    <div class="table-responsive">
        <table class="table tabPagos">
            <thead>
                <tr>
                    <th>id</th>
                    <th>nombre</th>
                    <th>apellido</th>
                    <th>diagnostico</th>
                    <th>tratamiento</th>
                    <th>notas</th>
                    <th>monto</th>
                    <th>fecha pago</th>
                    <th>metodo pago</th>
                </tr>
            </thead>
            <tbody id="listaPagos"></tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    </div>





    <div class="boton-logout"><?php include_once "../incluir/logout.php"  ?></div>
    <div class="offcanvasmenu"><?php include_once "../incluir/offcanvas.php"  ?></div>
    <div class="boton-sidebar"><?php include_once "../incluir/sidebar.php"  ?></div>


    <script src="../../public/js/lib/jquery37.js" defer></script>
    <script src="../../public/js/lib/bootstrap.bundle.js" defer></script>
    <script src="../../public/js/lib/datatable.js" defer></script>
    <script src="../../public/js/lib/sweetalert.js" defer></script>
    <script src="../../public/js/clases/Pago.js" defer></script>
    <script src="../../public/js/pagos.js" defer></script>




</body>

</html>