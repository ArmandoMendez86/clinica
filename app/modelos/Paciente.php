<?php
require_once '../../config/Conexion.php';

class Paciente
{
    private $db;

    public function __construct()
    {
        $this->db = Conexion::getConexion();
    }

    public function obtenerTodos()
    {
        $query = "SELECT * FROM pacientes ORDER BY fecha_registro DESC";
        return $this->db->query($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function agregar($id, $nombre, $apellido, $telefono, $email, $direccion, $fecha_cumple)
    {
        $query = "INSERT INTO pacientes (id, nombre, apellido, telefono, email, direccion, fecha_cumple) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$id, $nombre, $apellido, $telefono, $email, $direccion, $fecha_cumple]);
    }

    public function editar($id, $nombre, $apellido, $telefono, $email, $direccion, $fecha_cumple)
    {
        $query = "UPDATE pacientes SET nombre = ?, apellido = ?, telefono = ?, email = ?, direccion = ?, fecha_cumple = ? WHERE id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$nombre, $apellido, $telefono, $email, $direccion, $fecha_cumple, $id]);
    }

    public function eliminar($id)
    {
        $query = "DELETE FROM pacientes WHERE id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$id]);
    }
}
