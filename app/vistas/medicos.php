<?php
include_once "../incluir/auth.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Medicos</title>
    <link rel="stylesheet" href="../../public/css/datatables.css">
    <link rel="stylesheet" href="../../public/css/fontawesome4.7.css">
    <link rel="stylesheet" href="../../public/css/bootstrap5.2.css">
    <link rel="stylesheet" href="../../public/css/main.css">

</head>

<body class="p-5 w-100">
    <h1 class="fs-4 text-center">Gestión de Medicos</h1>

    <div class="accordion accordion-flush mb-5 mt-5" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <i class="fa fa-plus fa-2x p-2"></i> Agregar Medico
                </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <form id="formMedico" class="row g-3 mt-2">
                        <input hidden type="text" id="idMedico">
                        <div class="col-md-6">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre">
                        </div>
                        <div class="col-md-6">
                            <label for="correo" class="form-label">Correo</label>
                            <input type="text" class="form-control" id="correo">
                        </div>
                        <div class="col-md-6">
                            <label for="telefono" class="form-label">Telefono</label>
                            <input type="text" class="form-control" id="telefono">
                        </div>
                        <div class="col-md-6">
                            <label for="especialidad" class="form-label">Especialidad</label>
                            <input type="text" class="form-control" id="especialidad">
                        </div>
                        <button type="submit" class="btn btn-primary w-auto">Guardar</button>
                    </form>
                    <div id="errorContainer" class="mt-3"></div>
                </div>
            </div>
        </div>
    </div>


    <div class="table-responsive">
        <table class="table tabMedicos">
            <thead>
                <tr>
                    <th>id</th>
                    <th>nombre</th>
                    <th>correo</th>
                    <th>telefono</th>
                    <th>especialidad</th>
                    <th>acciones</th>
                </tr>
            </thead>
            <tbody id="listaMedicos"></tbody>
        </table>
    </div>



    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formEditarMedico" class="row g-3">
                        <input hidden type="text" id="idEditarMedico">
                        <div class="col-md-6">
                            <label for="editarNombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="editarNombreMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="editarCorreoMedico" class="form-label">Correo</label>
                            <input type="text" class="form-control" id="editarCorreoMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="editarTelefonoMedico" class="form-label">Telefono</label>
                            <input type="text" class="form-control" id="editarTelefonoMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="editarEspecialidadMedico" class="form-label">Especialidad</label>
                            <input type="text" class="form-control" id="editarEspecialidadMedico">
                        </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                    </form>
                </div>
                <div id="errorContainerEditar" class="mt-3"></div>
            </div>
        </div>
    </div>

    <div class="boton-logout"><?php include_once "../incluir/logout.php"  ?></div>
    <div class="offcanvasmenu"><?php include_once "../incluir/offcanvas.php"  ?></div>
    <div class="boton-sidebar"><?php include_once "../incluir/sidebar.php"  ?></div>


    <script src="../../public/js/lib/jquery37.js" defer></script>
    <script src="../../public/js/lib/bootstrap.bundle.js" defer></script>
    <script src="../../public/js/lib/datatable.js" defer></script>
    <script src="../../public/js/lib/sweetalert.js" defer></script>
    <script src="../../public/js/clases/Medico.js" defer></script>
    <script src="../../public/js/medicos.js" defer></script>




</body>

</html>