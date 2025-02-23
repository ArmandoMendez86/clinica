<?php
include_once "../incluir/auth.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Roles</title>
    <link rel="stylesheet" href="../../public/css/datatables.css">
    <link rel="stylesheet" href="../../public/css/fontawesome4.7.css">
    <link rel="stylesheet" href="../../public/css/bootstrap5.2.css">
    <link rel="stylesheet" href="../../public/css/main.css">

</head>

<body class="p-1 w-100">
    <div class="d-flex h-100 align-items-center">
        <div class="offcanvasmenu p-2"><?php include_once "../incluir/offcanvas.php"  ?></div>
        <div class="table-responsive flex-grow-1">
            <h1 class="fs-4 text-center mt-4">Gestión de Roles</h1>
            <div class="accordion accordion-flush mb-5 mt-5" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <i class="fa fa-plus fa-2x p-2"></i> Agregar Usuario
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <form id="formUsuario" class="row g-3 mt-2">
                                <input hidden type="text" id="idUsuario">
                                <div class="col-md-4">
                                    <label for="usuario" class="form-label">Usuario</label>
                                    <input type="text" class="form-control" id="usuario">
                                </div>
                                <div class="col-md-4">
                                    <label for="password" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" id="password">
                                </div>
                                <div class="col-md-4">
                                    <label for="perfil" class="form-label">Perfil</label>
                                    <select id="perfil" class="form-select">
                                        <option value="admin">Administrador</option>
                                        <option value="vendedor">Vendedor</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary w-auto mx-auto">Guardar</button>
                            </form>
                            <div id="errorContainer" class="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table tabUsuarios">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>usuario</th>
                            <th>perfil</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaUsuarios"></tbody>
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
                            <form id="formEditarUsuario" class="row g-3">
                                <input hidden type="text" id="idEditarUsuario">
                                <div class="col-md-4">
                                    <label for="editarUsuario" class="form-label">Usuario</label>
                                    <input type="text" class="form-control" id="editarUsuario">
                                </div>
                                <div class="col-md-4">
                                    <label for="editarPassword" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" id="editarPassword">
                                </div>
                                <div class="col-md-4">
                                    <label for="perfil" class="form-label">Perfil</label>
                                    <select id="editarPerfil" class="form-select">
                                        <option value="admin">Administrador</option>
                                        <option value="vendedor">Vendedor</option>
                                    </select>
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
    <script src="../../public/js/clases/Usuario.js" defer></script>
    <script src="../../public/js/usuarios.js" defer></script>




</body>

</html>