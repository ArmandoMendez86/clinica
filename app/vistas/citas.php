<?php
include_once "../incluir/auth.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Citas</title>
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
            <h1 class="fs-4 text-center">Gestión de Citas</h1>
            <div class="accordion accordion-flush mb-5 mt-5" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <i class="fa fa-plus fa-2x p-2"></i> Agregar Cita
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-primary" id="registrarNuevoPaciente" data-bs-toggle="modal" data-bs-target="#staticBackdropNuevoPaciente">
                                    <i class="fa fa-arrow-right"></i>
                                    Agregar Paciente
                                </button>
                                <button class="btn btn-primary" id="registrarNuevoHistorial" data-bs-toggle="modal" data-bs-target="#staticBackdropNuevoHistorial">
                                    <i class="fa fa-arrow-right"></i>
                                    Agregar Historial
                                </button>
                            </div>
                            <form id="formCita" class="row g-3 mt-2">
                                <input hidden type="text" id="idCita">
                                <div class="col-md-6">
                                    <label for="id_paciente" class="form-label">Paciente</label>
                                    <select id="id_paciente" class="form-control misPacientes" style="width: 100%;"></select>
                                </div>
                                <div class="col-md-6">
                                    <label for="fecha_hora" class="form-label">Fecha y Hora</label>
                                    <input type="datetime-local" class="form-control" id="fecha_hora">
                                </div>
                                <div class="col-md-12">
                                    <label for="idHistorial" class="form-label">Motivo/Consulta</label>
                                    <select id="idHistorial" class="form-control"></select>
                                </div>
                                <button type="submit" class="btn btn-primary w-auto">Agendar</button>
                            </form>
                            <div id="errorCitaContainer" class="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table tabCitas">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>idcliente</th>
                            <th>nombre</th>
                            <th>email</th>
                            <th>telefono</th>
                            <th>fecha</th>
                            <th>idhistorial</th>
                            <th>motivo</th>
                            <th>estado</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaCitas"></tbody>
                </table>
            </div>
            <!-- Modal edicion de estado de cita-->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Cita</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formEditarCita" class="row g-3">
                                <input hidden type="text" id="idEditarCita">
                                <div class="col-md-6">
                                    <label for="editarIdPaciente" class="form-label">Paciente</label>
                                    <select id="editarIdPaciente" class="form-control" disabled></select>
                                </div>
                                <div class="col-md-6">
                                    <label for="editarFechaHora" class="form-label">Fecha y Hora</label>
                                    <input type="datetime-local" class="form-control" id="editarFechaHora">
                                </div>
                                <div class="col-md-6">
                                    <label for="editarMotivo" class="form-label">Motivo</label>
                                    <select id="editarMotivo" class="form-control" disabled></select>
                                </div>
                                <div class="col-md-6">
                                    <label for="editarEstado" class="form-label">Estado</label>
                                    <select id="editarEstado" class="form-control">
                                        <option value="pendiente">pendiente</option>
                                        <option value="completada">completada</option>
                                        <option value="cancelada">cancelada</option>
                                    </select>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">
                                Guardar cambios
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal para pago de cita-->
            <div class="modal fade" id="staticBackdropPago" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-6 text-white" id="staticBackdropLabel"><i class="fa fa-money fa-2x p-2 text-white" aria-hidden="true"></i>Registro de Pago</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formPago" class="row g-3">
                                <input hidden type="text" id="idPago">
                                <div class="col-md-6">
                                    <label for="monto" class="form-label">Monto</label>
                                    <input type="number" id="monto" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label for="tipoPago" class="form-label">Tipo Pago</label>
                                    <select id="tipoPago" class="form-control">
                                        <option value="efectivo">Efectivo</option>
                                        <option value="transferencia">Transferencia</option>
                                    </select>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="cancelarPago" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Registrar Pago</button>
                            </form>
                        </div>
                        <div id="errorPagoContainer" class="mt-3"></div>
                    </div>
                </div>
            </div>
            <!-- Modal para agregar nuevo paciente-->
            <div class="modal fade" id="staticBackdropNuevoPaciente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-6" id="staticBackdropLabel"><i class="fa fa-user fa-2x p-2" aria-hidden="true"></i>Registro Paciente</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <?php include_once "../incluir/formAgregarPaciente.php" ?>
                            <div id="errorContainer" class="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal para agregar nuevo historial-->
            <div class="modal fade" id="staticBackdropNuevoHistorial" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-6" id="staticBackdropLabel"><i class="fa fa-user fa-2x p-2" aria-hidden="true"></i>Asignar Historial a: <span id="historialPara"></span> </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <?php include_once "../incluir/formAgregarHistorial.php" ?>
                            <div id="errorHistorialContainer" class="mt-3"></div>
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
    <script src="../../public/js/lib/moment.js" defer></script>
    <script src="../../public/js/clases/Paciente.js" defer></script>
    <script src="../../public/js/clases/HistorialMedico.js" defer></script>
    <script src="../../public/js/clases/Pago.js" defer></script>
    <script src="../../public/js/clases/Cita.js" defer></script>
    <script src="../../public/js/citas.js" defer></script>
</body>

</html>