<div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdropCanvas" aria-labelledby="staticBackdropLabelCanva">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title fs-2" id="staticBackdropLabelCanva">Menu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item" id="vistaPacientes">
                <a class="nav-link" href="pacientes.php">
                    <i class="fa fa-user fa-2x me-4" aria-hidden="true"></i>
                    Pacientes
                </a>
            </li>
            <li class="nav-item" id="vistaMedicos">
                <a class="nav-link" href="medicos.php">
                    <i class="fa fa-user-md fa-2x" aria-hidden="true" style="width: 40px;"></i>
                    Medicos
                </a>
            </li>
            <li class="nav-item" id="vistaCitas">
                <a class="nav-link" href="citas.php">
                    <i class="fa fa-calendar fa-2x" aria-hidden="true" style="width: 40px;"></i>
                    Citas
                </a>
            </li>
            <li class="nav-item" id="vistaRecetas">
                <a class="nav-link" href="recetas.php">
                    <i class="fa fa-file-text-o fa-2x" aria-hidden="true" style="width: 40px;"></i>
                    Recetas
                </a>
            </li>
            <li class="nav-item" id="vistaOdontograma">
                <a class="nav-link" href="odontograma.php">
                    <i class="fa fa-stethoscope fa-2x" aria-hidden="true" style="width: 40px;"></i>
                    Odontogramas
                </a>
            </li>
            <li class="nav-item" id="vistaHistorial">
                <a class="nav-link" href="historial.php">
                    <i class="fa fa-history fa-2x" aria-hidden="true" style="width: 40px;"></i>
                    Historial Medico
                </a>
            </li>
            <li class="nav-item" id="vistaExpediente">
                <a class="nav-link" href="expediente.php">
                    <i class="fa fa-book fa-2x" aria-hidden="true" style="width: 40px;"></i>
                    Expediente Clinico
                </a>
            </li>
            <li class="nav-item" id="vistaPagos">
                <a class="nav-link" href="pagos.php">
                    <i class="fa fa-credit-card fa-2x" aria-hidden="true" style="width: 40px;"></i>
                    Pagos
                </a>
            </li>
            <li class="nav-item" id="vistaUsuarios">
                <a class="nav-link" href="usuarios.php">
                    <i class="fa fa-lock fa-2x" aria-hidden="true" style="width: 40px;"></i>
                    Roles
                </a>
            </li>
            <!--  <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li> -->
        </ul>
    </div>
</div>

<script>
    let pagina = window.location.pathname.split("/").pop();
    if (pagina === "pacientes.php") {
        document.querySelector("#vistaPacientes").classList.add("activo")
    } else if (pagina === "citas.php") {
        document.querySelector("#vistaCitas").classList.add("activo")
    } else if (pagina === "historial.php") {
        document.querySelector("#vistaHistorial").classList.add("activo")
    } else if (pagina === "medicos.php") {
        document.querySelector("#vistaMedicos").classList.add("activo")
    } else if (pagina === "odontograma.php") {
        document.querySelector("#vistaOdontograma").classList.add("activo")
    } else if (pagina === "expediente.php") {
        document.querySelector("#vistaExpediente").classList.add("activo")
    } else if (pagina === "recetas.php") {
        document.querySelector("#vistaRecetas").classList.add("activo")
    } else if (pagina === "pagos.php") {
        document.querySelector("#vistaPagos").classList.add("activo")
    }
</script>