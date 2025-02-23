<?php
include_once "../incluir/auth.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recetas Medicas</title>
    <link rel="stylesheet" href="../../public/css/datatables.css">
    <link rel="stylesheet" href="../../public/css/fontawesome4.7.css">
    <link rel="stylesheet" href="../../public/css/bootstrap5.2.css">
    <link rel="stylesheet" href="../../public/css/select2.css">
    <link rel="stylesheet" href="../../public/css/main.css">

</head>

<body class="p-1 w-100">
    <div class="d-flex h-100 align-items-center">
        <div class="offcanvasmenu p-2"><?php include_once "../incluir/offcanvas.php"  ?></div>
        <div class="table-responsive flex-grow-1">
            <h1 class="fs-4 text-center">Receta Médica</h1>
            <div class="accordion accordion-flush mb-5 mt-5" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <i class="fa fa-plus fa-2x p-2"></i> Nueva Receta
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <form id="formReceta" class="row g-3 mt-2">
                                <input hidden type="text" id="idReceta">
                                <div class="col-md-6">
                                    <label for="paciente" class="form-label">Paciente</label>
                                    <select class="form-select pacientes" id="paciente" style="width: 100%;"></select>
                                </div>
                                <div class="col-md-6">
                                    <label for="diagnostico" class="form-label  position-relative">
                                        Motivo/Consulta
                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info d-none">
                                            <span id="numDiagnostico"></span>
                                            <span class="visually-hidden">unread messages</span>
                                        </span>
                                    </label>
                                    <select class="form-select" id="diagnostico"></select>
                                </div>
                                <div class="col-md-6">
                                    <label for="medico" class="form-label">Médico</label>
                                    <select class="form-select medicos" id="medico" style="width: 100%;"></select>
                                </div>
                                <div class="col-md-6">
                                    <label for="fecha" class="form-label">Fecha</label>
                                    <input type="datetime-local" class="form-control" id="fecha">
                                </div>
                                <div class="col-md-6">
                                    <label for="medicamentos" class="form-label">Medicamentos</label>
                                    <textarea class="form-control" id="medicamentos" rows="3"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="dosis" class="form-label">Dosis</label>
                                    <textarea class="form-control" id="dosis" rows="3"></textarea>
                                </div>
                                <div class="col-md-12">
                                    <label for="indicaciones" class="form-label">Indicaciones</label>
                                    <textarea class="form-control" id="indicaciones" rows="3"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary w-auto">Guardar Receta</button>
                            </form>
                            <div id="errorContainer" class="mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <button id="generarReceta">generar receta</button> -->
            <div class="table-responsive">
                <table class="table tabRecetas table-sm">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>telefono</th>
                            <th>doctor</th>
                            <th>especialidad</th>
                            <th>motivo</th>
                            <th>medicamentos</th>
                            <th>dosis</th>
                            <th>indicaciones</th>
                            <th>fecha</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaRecetas"></tbody>
                </table>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Imprimir receta</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="pdf-container"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="boton-logout"><?php include_once "../incluir/logout.php"  ?></div>
        </div>
    </div>



    <script src="../../public/js/lib/jquery37.js" defer></script>
    <script src="../../public/js/lib/bootstrap.bundle.js" defer></script>
    <script src="../../public/js/lib/datatable.js" defer></script>
    <script src="../../public/js/lib/sweetalert.js" defer></script>
    <script src="../../public/js/lib/select2.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="../../public/js/clases/Paciente.js" defer></script>
    <script src="../../public/js/clases/Medico.js" defer></script>
    <script src="../../public/js/clases/Receta.js" defer></script>
    <script src="../../public/js/clases/HistorialMedico.js" defer></script>
    <script src="../../public/js/recetas.js" defer></script>




</body>

</html>