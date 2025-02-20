<?php
require_once '../../config/Conexion.php';

class HistorialMedico
{
    private $db;

    public function __construct()
    {
        $this->db = Conexion::getConexion();
    }

    public function obtenerHistoriales()
    {
        $query = "SELECT h.id, h.id_paciente, p.nombre, p.apellido, p.telefono, h.diagnostico, h.tratamiento, h.notas, h.fecha FROM historial_medico AS h
        INNER JOIN pacientes AS p ON p.id = h.id_paciente ORDER BY fecha DESC";
        return $this->db->query($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerPorPaciente($id_paciente)
    {
        $query = "SELECT * FROM historial_medico WHERE id_paciente = ? ORDER BY fecha DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$id_paciente]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function agregar($id_paciente, $diagnostico, $tratamiento, $notas)
    {
        $query = "INSERT INTO historial_medico (id_paciente, diagnostico, tratamiento, notas) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$id_paciente, $diagnostico, $tratamiento, $notas]);
    }

    public function editar($id, $diagnostico, $tratamiento, $notas)
    {
        $query = "UPDATE historial_medico SET diagnostico = ?, tratamiento = ?, notas = ? WHERE id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$diagnostico, $tratamiento, $notas, $id]);
    }

    public function eliminar($id)
    {
        $query = "DELETE FROM historial_medico WHERE id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$id]);
    }
}
