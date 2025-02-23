<?php
include_once "../incluir/auth.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Pacientes</title>
    <link rel="stylesheet" href="../../public/css/datatables.css">
    <link rel="stylesheet" href="../../public/css/fontawesome4.7.css">
    <link rel="stylesheet" href="../../public/css/bootstrap5.2.css">
    <link rel="stylesheet" href="../../public/css/main.css">

</head>

<body class="p-1 w-100">
    <div class="d-flex h-100 align-items-center">
        <div class="offcanvasmenu p-2"><?php include_once "../incluir/offcanvas.php"  ?></div>
        <div  class="table-responsive flex-grow-1">
            <h1 class="fs-4 text-center mt-4">Gestión de Pacientes</h1>
            <div class="accordion accordion-flush mb-5 mt-5" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <i class="fa fa-plus fa-2x p-2"></i> Agregar Paciente
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <?php include_once "../incluir/formAgregarPaciente.php" ?>
                            <div id="errorContainer" class="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table tabPacientes">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>teléfono</th>
                            <th>email</th>
                            <th>dirección</th>
                            <th>registro</th>
                            <th>nacimiento</th>
                            <th>ocupación</th>
                            <th>enfermedades</th>
                            <th>antecedentes/p</th>
                            <th>alergias</th>
                            <th>medicación</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaPacientes"></tbody>
                </table>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Usuario</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formEditarPaciente" class="row g-3">
                                <input hidden type="text" id="idEditarPaciente">
                                <div class="col-md-6">
                                    <label for="editarNombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="editarNombre">
                                </div>
                                <div class="col-md-6">
                                    <label for="editarEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="editarEmail">
                                </div>
                                <div class="col-md-6">
                                    <label for="editar_fecha_nacimiento" class="form-label">Fecha nacimiento</label>
                                    <input type="date" class="form-control" id="editar_fecha_cumple">
                                </div>
                                <div class="col-md-6">
                                    <label for="editarTelefono" class="form-label">Teléfono</label>
                                    <input type="tel" class="form-control" id="editarTelefono">
                                </div>
                                <div class="col-md-6">
                                    <label for="editarDireccion" class="form-label">Dirección</label>
                                    <input type="text" class="form-control" id="editarDireccion">
                                </div>
                                <div class="col-md-6">
                                    <label for="ocupacion" class="form-label">Ocupación</label>
                                    <textarea id="editarOcupacion" class="form-control"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="enfermedades_c" class="form-label">Enfermedades/c</label>
                                    <textarea id="editarEnfermedades_c" class="form-control"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="antecedentes_p" class="form-label">Antecedentes/p</label>
                                    <textarea id="editarAntecedentes_p" class="form-control"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="alergias" class="form-label">Alergias/c</label>
                                    <textarea id="editarAlergias" class="form-control"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="medicacion" class="form-label">Medicación</label>
                                    <textarea id="editarMedicacion" class="form-control"></textarea>
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
        </div>
    </div>

    


    <script src="../../public/js/lib/jquery37.js" defer></script>
    <script src="../../public/js/lib/bootstrap.bundle.js" defer></script>
    <script src="../../public/js/lib/datatable.js" defer></script>
    <script src="../../public/js/lib/sweetalert.js" defer></script>
    <script src="../../public/js/clases/Paciente.js" defer></script>
    <script src="../../public/js/pacientes.js" defer></script>




</body>

</html>