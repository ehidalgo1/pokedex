
$(function () {
    $('[data-toggle="popover"]').popover()
});


let listaPokemon = new Array();

function cargarDatos(){

    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .then(res => res.json())
    .then(array => {
    
        listaPokemon = array.results;
    })
    .catch(error => console.warn(error))

}

cargarDatos();

function mostrarImagenPokemon(urlPokemon){
    
    
    let separador = urlPokemon.split("/");
    let numeroPokemon = separador[6];
    let imagen = `https://www.cpokemon.com/pokes/home/${numeroPokemon}.png`;

    return imagen;
}

function mostrarDatosPokemon(urlPokemon){

    fetch(urlPokemon)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error(error))

}


function infoCard(){

    //evento card de pokemon sobre
    let cards = document.querySelectorAll('.card');

    if (cards!==null) {
        cards.forEach((item)=> {
            item.addEventListener('mouseover', ()=>{

                $(item).popover('show');

            });
        })
    }
    

}


document.getElementById('buscador').addEventListener('keyup', ()=> {

    let buscador = document.getElementById('buscador').value;

    let resultado = listaPokemon.filter((item,i) => item.name.indexOf(buscador) !== -1);

    let html = "";

    //consulto si hay elementos en el arraylist, sino muesto un mensaje informando no encontrado
    if (resultado.length>0) {

        resultado.forEach(pokemon => {
    
            html += `
            <div class="col-md-4">
                <div class="card m-2 text-center shadow shadow-sm" id="popover-info" tabindex="0"
                data-toggle="popover" data-trigger="hover" title="${pokemon.name}" data-content="${mostrarDatosPokemon(pokemon.url)}">
                    <div class="card-header">
                        <h6>${pokemon.name}</h6>
                    </div>
                    <div class="card-body">
                        <img src=${mostrarImagenPokemon(pokemon.url)} width="150" height="150">
                        </div>
                </div>
            </div>
            `;
    
        });
        
    }else{
        html = `<div class="col-md-12 text-center"><span class="alert alert-danger text-center">No se ha encontrado el pokémon</span></div>`;
    }

    

    let contenedor = document.querySelector('#contenedor');
    let mostrando = document.getElementById('mostrando');
    mostrando.innerHTML = `<p>mostrando <b>${resultado.length} / ${listaPokemon.length}</b></p>`;

    contenedor.innerHTML = html;

    infoCard();
    

});











