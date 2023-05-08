const d = document;
const selectProvincias = d.getElementById("selectProvincias");
const selectDepartamentos = d.getElementById("selectDepartamentos");
const selectLocalidades = d.getElementById("selectLocalidades");

function provincia() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
    .then(json => {
        json.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena las provincias alfabéticamente

        let options = `<option value="Elige una provincia">Elige una provincia</option>`;

        json.provincias.forEach(a => options += `<option value="${a.nombre}">${a.nombre}</option>`);

        selectProvincias.innerHTML = options;
    })
    .catch(error => {
        let mensaje = error.statusText || "Ocurrió un error";

        selectProvincias.nextElementSibling.innerHTML = `Error: {error.status}: {mensaje}`;
    })
}

d.addEventListener("DOMContentLoaded", provincia)

function departamento(provincia) {
    fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provincia}&max=50`)
    .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
    .then(json => {

        json.departamentos.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena los departamentos alfabéticamente

        let options = `<option value="Elige un departamento">Elige un departamento</option>`;

        json.departamentos.forEach(a => options += `<option value="${a.id}">${a.nombre}</option>`);

        selectDepartamentos.innerHTML = options;
    })
    .catch(error => {
        let mensaje = error.statusText || "Ocurrió un error";

        selectDepartamentos.nextElementSibling.innerHTML = `Error: {error.status}: {mensaje}`;
    })
}

selectProvincias.addEventListener("change", e => {
    departamento(e.target.value);
    console.log(e.target.value)
})

function localidad(departamento) {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${departamento}&max=50`)
    .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
    .then(json => {
        json.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena las localidades alfabéticamente


        let options = `<option value="Elige una localidad">Elige una localidad</option>`;

        json.localidades.forEach(a => options += `<option value="${a.id}">${a.nombre}</option>`);

        selectLocalidades.innerHTML = options;
    })
    .catch(error => {
        let mensaje = error.statusText || "Ocurrió un error";

        selectLocalidades.nextElementSibling.innerHTML = `Error: {error.status}: {mensaje}`;
    })
}

selectDepartamentos.addEventListener("change", e => {
    localidad(e.target.value);
    console.log(e.target.value)
})