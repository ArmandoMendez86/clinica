<form id="formPaciente" class="row g-3 mt-2">
    <div class="col-md-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre">
    </div>
    <div class="col-md-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control">
    </div>
    <div class="col-md-3">
        <label for="fecha_nacimiento" class="form-label">Fecha nacimiento</label>
        <input type="date" class="form-control" id="fecha_cumple">
    </div>
    <div class="col-md-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input type="tel" id="telefono" class="form-control">
    </div>
    <div class="col-md-3">
        <label for="direccion" class="form-label">Dirección</label>
        <textarea id="direccion" class="form-control"></textarea>
    </div>
    <div class="col-md-3">
        <label for="ocupacion" class="form-label">Ocupación</label>
        <textarea id="ocupacion" class="form-control"></textarea>
    </div>
    <div class="col-md-3">
        <label for="enfermedades_c" class="form-label">Enfermedades/c</label>
        <textarea id="enfermedades_c" class="form-control"></textarea>
    </div>
    <div class="col-md-3">
        <label for="antecedentes_p" class="form-label">Antecedentes/p</label>
        <textarea id="antecedentes_p" class="form-control"></textarea>
    </div>
    <div class="col-md-6">
        <label for="alergias" class="form-label">Alergias/c</label>
        <textarea id="alergias" class="form-control"></textarea>
    </div>
    <div class="col-md-6">
        <label for="medicacion" class="form-label">Medicación</label>
        <textarea id="medicacion" class="form-control"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-auto mx-auto">Guardar</button>
</form>