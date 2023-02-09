import cargarDatos from './components/LoadPokemons.js';


$(function () {
    $('[data-toggle="popover"]').popover({
        html: true
    })
});

if(document.readyState) {
    cargarDatos(1);
}


document.getElementById("generation").addEventListener("change", (e) => {
    let gen = document.getElementById("generation");
    cargarDatos(gen.value);
});










