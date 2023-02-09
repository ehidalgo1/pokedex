import env from '../../../env.json' assert { type: "json" };

let listaPokemon = new Array();

export default function cargarDatos(generacion) {

    fetch(`${env.API_BASE_URL}/${generacion}`)
    .then(res => res.json())
    .then(result => {

        let html = "";
        
        result.pokemon_species.forEach(pokemon => {
            html += `
            <div class="col-md-4">
                <div class="card m-2 text-center shadow shadow-sm" id="${pokemon.name}" tabindex="0"
                data-toggle="popover" data-trigger="hover" title="${pokemon.name}" data-content="${mostrarDatosPokemon(pokemon.url, pokemon.name)}">
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

    let contenedor = document.querySelector('#contenedor');
    let mostrando = document.getElementById('mostrando');
    mostrando.innerHTML = `<p>mostrando <b>${listaPokemon.length} / ${listaPokemon.length}</b></p>`;
    contenedor.innerHTML = html;
    infoCard();

    })
    .catch(error => console.warn(error))

}

document.getElementById('buscador').addEventListener('keyup', ()=> {

    let buscador = document.getElementById('buscador').value.toLowerCase();
    let resultado = listaPokemon.filter((item,i) => item.name.indexOf(buscador) !== -1);
    let html = "";

    //consulto si hay elementos en el arraylist, sino muesto un mensaje informando no encontrado
    if (resultado.length>0) {

        resultado.forEach(pokemon => {
    
            html += `
            <div class="col-md-4">
                <div class="card m-2 text-center shadow shadow-sm" id="${pokemon.name}" tabindex="0"
                data-toggle="popover" data-trigger="hover" title="${pokemon.name}" data-content="${mostrarDatosPokemon(pokemon.url,pokemon.name)}">
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

//muestra la imagen de pokemon desde enlace externo
const mostrarImagenPokemon = (urlPokemon) => {
    let separador = urlPokemon.split("/");
    let numeroPokemon = separador[6];
    let imagen = `https://www.cpokemon.com/pokes/home/${numeroPokemon}.png`;
    return imagen;
}

//funcion para mostrar los datos del pokemon seleccionado en el popover
const mostrarDatosPokemon = (urlPokemon, nombrePokemon) => {

    fetch(urlPokemon)
    .then(res => res.json())
    .then(data => {
        
        let popover_body = document.querySelector(`#${nombrePokemon}`);

        if(popover_body!==null){

            let descripcion = "";
            descripcion = data.flavor_text_entries.filter(entries => entries.language.name === "es");
            let uniqueArray = [];
            descripcion.forEach( t => {
                if (!uniqueArray.includes(t.flavor_text)){
                    uniqueArray.push(t.flavor_text);
                }
            });
            

            let datos = `descripcion: ${uniqueArray} `

            popover_body.setAttribute('data-content',`${datos}`);
            popover_body.setAttribute('html',true);

        }

    })
    .catch(error => console.error(error))

}

//evento informacion de pokemon al seleccionar el card
const infoCard = () => {
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

