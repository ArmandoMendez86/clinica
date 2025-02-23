<?php

include_once "../incluir/auth.php";
require_once '../../config/Conexion.php';
$db = Conexion::getConexion();
$pacientes = $db->query("SELECT * FROM pacientes")->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Odontogramas</title>
    <link rel="stylesheet" href="../../public/css/datatables.css">
    <link rel="stylesheet" href="../../public/css/fontawesome4.7.css">
    <link rel="stylesheet" href="../../public/css/bootstrap5.2.css">
    <link rel="stylesheet" href="../../public/css/select2.css">
    <link rel="stylesheet" href="../../public/css/odontograma.css">
    <link rel="stylesheet" href="../../public/css/sidebar2.css">
    <link rel="stylesheet" href="../../public/css/main.css">

</head>

<body class="p-5 w-100 position-relative" style="height: 100vh;">
    <h1 class="fs-4 text-center mt-4">ODONTOGRAMA</h1>
    <label class="form-label" for="paciente">Seleccionar Paciente:</label>
    <select class="form-control pacientes" id="paciente">
        <option value="">Seleccione...</option>
        <?php foreach ($pacientes as $paciente): ?>
            <option value="<?= $paciente['id'] ?>"><?= $paciente['nombre'] ?> - <?= $paciente['telefono'] ?></option>
        <?php endforeach; ?>
    </select>

    <div id="odontograma" class="mt-5"></div>
    <div class="text-center"><button class="btn btn-primary mt-4" id="guardarOdontograma">Guardar</button></div>
    <div class="modal fade" id="modalEdicion" tabindex="-1" aria-labelledby="modalEdicionLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEdicionLabel">Editar Diente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formEdicion">
                        <div class="mb-3">
                            <label for="estado" class="form-label">Estado del diente</label>
                            <select id="estado" class="form-select">
                                <option value="sano">Sano</option>
                                <option value="caries">Caries</option>
                                <option value="extraido">Extraído</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="tratamiento" class="form-label">Tratamiento</label>
                            <input type="text" id="tratamiento" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label for="fechaUltimoTratamiento" class="form-label">Fecha del último tratamiento</label>
                            <input type="date" id="fechaUltimoTratamiento" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label for="notas" class="form-label">Notas</label>
                            <textarea id="notas" class="form-control"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" id="guardarEdicion" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
    <div class="boton-logout"><?php include_once "../incluir/logout.php"  ?></div>

    <div class="position-absolute  bottom-0 start-50 translate-middle-x w-100" id="menuBotoom">
        <div class="container">
            <div class="radio-tile-group">
                <div class="input-container">
                    <input id="pacientes" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon walk-icon">
                            <i class="fa fa-user fa-2x"></i>
                        </div>
                        <label for="walk" class="radio-tile-label">Paciente</label>
                    </div>
                </div>

                <div class="input-container">
                    <input id="medicos" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon bike-icon">
                            <i class="fa fa-user-md fa-2x"></i>
                        </div>
                        <label for="bike" class="radio-tile-label">Medico</label>
                    </div>
                </div>

                <div class="input-container">
                    <input id="citas" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon car-icon">
                            <i class="fa fa-calendar fa-2x"></i>
                        </div>
                        <label for="drive" class="radio-tile-label">Cita</label>
                    </div>
                </div>
                <div class="input-container">
                    <input id="recetas" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon car-icon">
                            <i class="fa fa-file-text-o fa-2x"></i>
                        </div>
                        <label for="drive" class="radio-tile-label">Receta</label>
                    </div>
                </div>
                <div class="input-container">
                    <input id="odontogramas" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon car-icon">
                            <i class="fa fa-stethoscope fa-2x"></i>
                        </div>
                        <label for="drive" class="radio-tile-label">Odont.</label>
                    </div>
                </div>
                <div class="input-container">
                    <input id="historial" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon car-icon">
                            <i class="fa fa-history fa-2x"></i>
                        </div>
                        <label for="drive" class="radio-tile-label">Historial</label>
                    </div>
                </div>
                <div class="input-container">
                    <input id="expediente" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon car-icon">
                            <i class="fa fa-book fa-2x"></i>
                        </div>
                        <label for="drive" class="radio-tile-label">Expediente</label>
                    </div>
                </div>
                <div class="input-container">
                    <input id="pagos" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon car-icon">
                            <i class="fa fa-credit-card fa-2x"></i>
                        </div>
                        <label for="drive" class="radio-tile-label">Pago</label>
                    </div>
                </div>
                <div class="input-container">
                    <input id="usuarios" class="radio-button" type="radio" name="radio">
                    <div class="radio-tile">
                        <div class="icon car-icon">
                            <i class="fa fa-lock fa-2x"></i>
                        </div>
                        <label for="drive" class="radio-tile-label">Rol</label>
                    </div>
                </div>
            </div>
        </div>
    </div>






    <script src="../../public/js/lib/jquery37.js" defer></script>
    <script src="../../public/js/lib/bootstrap.bundle.js" defer></script>
    <script src="../../public/js/lib/datatable.js" defer></script>
    <script src="../../public/js/lib/sweetalert.js" defer></script>
    <script src="../../public/js/lib/select2.js" defer></script>
    <script src="../../public/js/clases/Odontograma.js" defer></script>
    <script src="../../public/js/odontograma.js" defer></script>




</body>

</html>