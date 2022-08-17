import cargarDatos from './components/LoadPokemons.js';


$(function () {
    $('[data-toggle="popover"]').popover({
        html: true
    })
});



cargarDatos();









