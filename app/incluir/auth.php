<?php
session_start();
$auth = $_SESSION['iniciarSesion'];
if (!$auth) {
    header('Location: ../../index.php');
}
