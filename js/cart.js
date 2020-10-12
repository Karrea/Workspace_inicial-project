var articlesArray = [];
var subtotal = 0;
var unitSubtotal = subtotal;
var envio;
var total;

// index que dara el id a cada articulo
var index = 0;



//Funcion que convierte a usd el subtotal de cada articulo para sumarlo en el total
function toDolar(article) {
    
    if (article.currency == 'UYU') {
        var usdPrice = article.unitCost / 40;
        unitSubtotal= usdPrice * article.count;
    } else {
        unitSubtotal= article.unitCost * article.count;
    }
    subtotal += unitSubtotal;
}

//funcion que calcula los precios
function priceCalculator() {

    total = subtotal + envio;

}

function calcularEnvio() {
    var premiumValue = document.getElementById('premiumRadio').checked;
    var expressValue = document.getElementById('expressRadio').checked;
    var estandarValue = document.getElementById('estandarRadio').checked

    if (premiumValue) {
        envio = (subtotal * 0.15);
    } else if (expressValue) {
        envio = (subtotal * 0.07);
    } else if (estandarValue) {
        envio = (subtotal * 0.03);
    }
}

function showArticles() {
    const tableContainer = document.getElementById("tableBody");
    let toAppend = ``;


    for (article of articlesArray) {

        toDolar(article);
        
        article.id = index;
        index += 1;


        toAppend += `
            <tr> 
              <td class='w-50'> <img src=' ${article.src}' class='w-25' > ${article.name}  </td>
              <td> $ ${article.unitCost} ${article.currency} </td>
              <td> <input id='${article.id}' type='number' class='w-25' min='0' onchange="greatherThan();" value='${article.count}'> </td>
              <td id='subtotal'> ${unitSubtotal} </th>
            </tr>
          
        
        `; 
    }

    tableContainer.innerHTML = toAppend;
}

//Funcion que no permite seleccionar menos que 0 articulos
function greatherThan() {
    
    for (article of articlesArray) {
        var input = document.getElementById(article.id);
        
        article.count = input.value;
    
        if ( input.value < 0) {
            input.value = 0;
        }
        

    }
}



function showCostos() {
    var toAppend = `
    
    <h4 class="mb-3">Costos</h4>
    <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Subtotal</h6>
                    <small class="text-muted">Unitario del producto</small>
                  </div>
                  <span class="text-muted" id="productCostText"> ${subtotal} </span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Envio</h6>
                    <small class="text-muted">Según el tipo de publicación</small>
                  </div>
                  <span class="text-muted" id="comissionText"> ${envio} </span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total ($)</span>
                  <strong id="totalCostText"> ${total} </strong>
                </li>
              </ul>
            <hr class="mb-4">
    `;
    const divCostos = document.getElementById('costos');

    divCostos.innerHTML += toAppend;
}

document.addEventListener('DOMContentLoaded', function(e) {

    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.
    getJSONData(CART_INFO_URL).then(function(resultObj) { 
        if (resultObj.status === 'ok') {

            //iguala el json al array vacio que declaramos al comienzo
            articlesArray = resultObj.data.articles;
            
            //llama la funcion que muestra los articulos
            showArticles();

            
            calcularEnvio();
            
            priceCalculator();

            showCostos();
            
            
        }
            
    })

    
})









