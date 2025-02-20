<?php
include_once "../incluir/auth.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial Médico</title>
    <link rel="stylesheet" href="../../public/css/datatables.css">
    <link rel="stylesheet" href="../../public/css/fontawesome4.7.css">
    <link rel="stylesheet" href="../../public/css/bootstrap5.2.css">
    <link rel="stylesheet" href="../../public/css/select2.css">
    <link rel="stylesheet" href="../../public/css/main.css">

</head>

<body class="p-5 w-100">
    <h1 class="text-center fs-4">Historial Médico</h1>

    <div class="accordion accordion-flush mb-5 mt-5" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <i class="fa fa-plus fa-2x p-2"></i> Nuevo Historial
                </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <!-- Selección de Paciente -->
                    <div class="mb-3 mt-2">
                        <label for="pacienteSelect" class="form-label">Seleccionar Paciente</label>
                        <select id="pacienteSelect" class="form-select pacientes" style="width: 100%;">
                            <option value="">Seleccione un paciente...</option>
                        </select>
                    </div>

                    <!-- Formulario de Historial Médico -->
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Registrar Historial Médico</h5>
                            <form id="historialForm">
                                <div class="mb-3">
                                    <label for="diagnostico" class="form-label">Diagnóstico</label>
                                    <input type="text" class="form-control" id="diagnostico">
                                </div>
                                <div class="mb-3">
                                    <label for="tratamiento" class="form-label">Tratamiento</label>
                                    <input type="text" class="form-control" id="tratamiento">
                                </div>
                                <div class="mb-3">
                                    <label for="notas" class="form-label">Notas Adicionales</label>
                                    <textarea class="form-control" id="notas"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Guardar Historial</button>
                            </form>
                            <div id="errorContainer" class="mt-4"></div>
                        </div>
                    </div>
                    <div id="errorContainer"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-striped tabHistorial">
            <thead>
                <tr>
                    <th>id</th>
                    <th>idpaciente</th>
                    <th>nombre</th>
                    <th>apellido</th>
                    <th>telefono</th>
                    <th>diagnostico</th>
                    <th>tratamiento</th>
                    <th>notas</th>
                    <th>fecha</th>
                    <th>acciones</th>
                </tr>
            </thead>
            <tbody id="listaHistorial"></tbody>
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
                    <form id="formEditarHistorial" class="row g-3">
                        <input hidden type="text" id="idEditarHistorial">
                        <div class="col-md-6">
                            <label for="paciente" class="form-label">Paciente</label>
                            <input type="text" class="form-control" id="paciente" disabled>
                        </div>
                        <div class="col-md-6">
                            <label for="editarDiagnostico" class="form-label">Diagnostico</label>
                            <input type="text" class="form-control" id="editarDiagnostico">
                        </div>
                        <div class="col-md-6">
                            <label for="editarTratamiento" class="form-label">Tratamiento</label>
                            <textarea id="editarTratamiento" class="form-control"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label for="nota" class="form-label">Nota</label>
                            <textarea id="editarNota" class="form-control"></textarea>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                    </form>
                </div>
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
    <script src="../../public/js/lib/select2.js" defer></script>
    <script src="../../public/js/clases/HistorialMedico.js" defer></script>
    <script src="../../public/js/historial.js" defer></script>




</body>

</html>