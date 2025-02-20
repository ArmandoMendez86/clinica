<?php

include_once "../incluir/auth.php";
require_once '../../config/Conexion.php';

$db = Conexion::getConexion();
$stmt = $db->query("SELECT id, nombre, apellido FROM pacientes");
$pacientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expediente Clinico</title>
    <link rel="stylesheet" href="../../public/css/datatables.css">
    <link rel="stylesheet" href="../../public/css/fontawesome4.7.css">
    <link rel="stylesheet" href="../../public/css/bootstrap5.2.css">
    <link rel="stylesheet" href="../../public/css/select2.css">
    <link rel="stylesheet" href="../../public/css/odontograma.css">
    <link rel="stylesheet" href="../../public/css/main.css">

</head>

<body class="p-5 w-100">

    <div class="mt-4">
        <h1 class="fs-4 text-center">Expediente Clínico</h1>

        <!-- Selección de Paciente -->
        <div class="mb-4 flex-column">
            <label for="paciente" class="form-label">Seleccionar Paciente</label>
            <select id="paciente" class="form-select pacientes">
                <option value="">Seleccione un paciente</option>
                <?php foreach ($pacientes as $paciente) : ?>
                    <option value="<?= $paciente['id'] ?>">
                        <?= $paciente['nombre'] . " " . $paciente['apellido'] ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Datos del Expediente -->
        <div id="expediente-container" class="card d-none mt-5">
            <div class="card-header">
                <h5 class="mb-0">Detalles del Expediente</h5>
            </div>
            <div class="card-body">
                <p><strong>Fecha de Creación:</strong> <span id="fecha_creacion"></span></p>
                <p><strong>Observaciones:</strong> <span id="observaciones"></span></p>

                <!-- Tablas del expediente -->
                <ul class="nav nav-tabs" id="expedienteTabs">
                    <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" href="#historial">Historial Médico</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#recetas">Recetas Médicas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#citas">Citas Médicas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#verOdontograma">Odontograma</a>
                    </li>
                </ul>

                <div class="tab-content mt-3">
                    <!-- Historial Médico -->
                    <div class="tab-pane fade show active" id="historial">
                        <div class="table-responsive">
                            <table id="tablaHistorial" class="table table-striped">
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
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Recetas Médicas -->
                    <div class="tab-pane fade" id="recetas">
                        <div class="table-responsive">
                            <table id="tablaRecetas" class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>nombre</th>
                                        <th>apellido</th>
                                        <th>telefono</th>
                                        <th>doctor</th>
                                        <th>especialidad</th>
                                        <th>medicamentos</th>
                                        <th>dosis</th>
                                        <th>indicaciones</th>
                                        <th>diagnostico</th>
                                        <th>fecha</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Citas Médicas -->
                    <div class="tab-pane fade" id="citas">
                        <div class="table-responsive">
                            <table id="tablaCitas" class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>idcliente</th>
                                        <th>nombre</th>
                                        <th>apellido</th>
                                        <th>email</th>
                                        <th>telefono</th>
                                        <th>fecha</th>
                                        <th>estado</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <!-- Odontograma -->
                    <div class="tab-pane fade" id="verOdontograma">
                        <div id="odontograma"></div>

                        <div class="modal fade" id="modalEdicion" tabindex="-1" aria-labelledby="modalEdicionLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="modalEdicionLabel"></h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form id="formEdicion">
                                            <div class="mb-3">
                                                <label for="estado" class="form-label">Estado del diente</label>
                                                <select id="estado" class="form-select" disabled>
                                                    <option value="sano">Sano</option>
                                                    <option value="caries">Caries</option>
                                                    <option value="extraido">Extraído</option>
                                                </select>
                                            </div>

                                            <div class="mb-3">
                                                <label for="tratamiento" class="form-label">Tratamiento</label>
                                                <input type="text" id="tratamiento" class="form-control" disabled />
                                            </div>

                                            <div class="mb-3">
                                                <label for="fechaUltimoTratamiento" class="form-label">Fecha del último tratamiento</label>
                                                <input type="date" id="fechaUltimoTratamiento" class="form-control" disabled />
                                            </div>

                                            <div class="mb-3">
                                                <label for="notas" class="form-label">Notas</label>
                                                <textarea id="notas" class="form-control" disabled></textarea>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="boton-logout"><?php include_once "../incluir/logout.php"  ?></div>
        <div class="offcanvasmenu"><?php include_once "../incluir/offcanvas.php"  ?></div>
        <div class="boton-sidebar"><?php include_once "../incluir/sidebar.php"  ?></div>
    </div>



    <script src="../../public/js/lib/jquery37.js" defer></script>
    <script src="../../public/js/lib/bootstrap.bundle.js" defer></script>
    <script src="../../public/js/lib/datatable.js" defer></script>
    <script src="../../public/js/lib/sweetalert.js" defer></script>
    <script src="../../public/js/lib/select2.js" defer></script>
    <script src="../../public/js/clases/Odontograma.js" defer></script>
    <script src="../../public/js/clases/Expediente.js" defer></script>
    <script src="../../public/js/expediente.js" defer></script>




</body>

</html>