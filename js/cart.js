var articlesArray = [];
var subtotal = 0;
var unitSubtotal = subtotal;
var envio;
var total;
var usdPrice;


function showArticles() {
  
  const tableContainer = document.getElementById("tableBody");
  let toAppend = ``;

  // index que dara el id a cada articulo
  let index = 0;

  for (article of articlesArray) {
    
    // toDolar(article);

    article.id = index;
    index += 1;

    toAppend += `
            <tr> 
              <td class='w-50'> <img src=' ${article.src}' class='w-25' > ${article.name}  </td>
              <td> $ ${article.unitCost} ${article.currency} </td>
              <td> <input id='count${article.id}' type='number' class='w-25' min='1' onchange="cuandoCambia();" value='${article.count}'> </td>
              <td id='subtotal${article.id}'> ${article.subotal} </td>
              <td class='text-center' > <button class="fa fa-trash" id='deleteButton${article.id}' onclick='deleteItem(${article.id})'>  </button>   </td>
            </tr>
        `;
  }

  tableContainer.innerHTML = toAppend;
}

function deleteItem(pos) {
  console.log('entra a la function');
  console.log(pos);
  articlesArray.splice(pos, 1);
  
  showArticles();
  cuandoCambia();

  siNoHayArticulos();

}

function siNoHayArticulos() {

}

function cuandoCambia() {
  calculateUnitSubtotal();
  subtotalFrom0();

  calculateSubtotal();
  calcularEnvio();
  calculateTotal();

}

function alCambiarEnvio() {
  calcularEnvio();
  calculateTotal();
}

function calculateUnitSubtotal() {
  for (article of articlesArray) {
    var inputCount = document.getElementById("count" + article.id);
    usdPrice = article.unitCost / 40;

    //Dice que la cantidad de articulos es = al numero ingresado en el input
    article.count = inputCount.value;

    //guarda el subtotal en una propiedad de cada article
    article.subtotal = unitSubtotal;

    if (article.currency == "UYU") {
      article.subtotal = usdPrice * article.count;
      document.getElementById("subtotal" + article.id).innerHTML = article.subtotal;

      to0(inputCount, article.id);

    } else {
      article.subtotal = article.count * article.unitCost;
      document.getElementById("subtotal" + article.id).innerHTML = article.subtotal;

      to0(inputCount, article.id);
    }
  }
}

function to0(input, id) {
  if (input.value < 0) {
    input.value = 1;
    


    // document.getElementById("subtotal" + id).innerHTML = 0;
  }
}

function showCostos() {
  var toAppend = `
    <h4 class="mb-3">Costos</h4>
    <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Subtotal</h6>
                    <small class="text-muted"> De los productos finales </small>
                  </div>
                  <span class="text-muted" id="subTotalFinal"> ${subtotal} </span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Envio</h6>
                    <small class="text-muted">Según el tipo de publicación</small>
                  </div>
                  <span class="text-muted" id="costoEnvio"> ${envio} </span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total ($)</span>
                  <strong id="totalCost"> ${total} </strong>
                </li>
              </ul>
            <hr class="mb-4">
    `;
  const divCostos = document.getElementById("costos");

  divCostos.innerHTML += toAppend;
}

//funcion que calcula los precios
function calculateSubtotal() {

    
    for (article of articlesArray) {
            

        subtotal += article.subtotal;

        document.getElementById("subTotalFinal").innerHTML = subtotal;
    }
}

function subtotalFrom0() {
  subtotal = 0;
  document.getElementById("subTotalFinal").innerHTML = 0;
}

function calcularEnvio() {
  var premiumValue = document.getElementById("premiumRadio").checked;
  var expressValue = document.getElementById("expressRadio").checked;
  var estandarValue = document.getElementById("estandarRadio").checked;

  if (premiumValue) {
    envio = subtotal * 0.15;
    document.getElementById("costoEnvio").innerHTML = envio;
  } else if (expressValue) {
    envio = subtotal * 0.07;
    document.getElementById("costoEnvio").innerHTML = envio;
  } else if (estandarValue) {
    envio = subtotal * 0.03;
    document.getElementById("costoEnvio").innerHTML = envio;
  }
}

function calculateTotal() {
  total = subtotal + envio;
  document.getElementById("totalCost").innerHTML = total;
}

document.addEventListener("DOMContentLoaded", function (e) {

  

  for (article of articlesArray) {
    var button = document.getElementById('deleteButton' + article.id);
    
    button.addEventListener('click', function() {
      articlesArray.splice(article.id, 1);
    });
  };
  //Función que se ejecuta una vez que se haya lanzado el evento de
  //que el documento se encuentra cargado, es decir, se encuentran todos los
  //elementos HTML presentes.
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      //iguala el json al array vacio que declaramos al comienzo
      articlesArray = resultObj.data.articles;

      //llama la funcion que muestra los articulos
      showArticles();

      showCostos();

      //funcion que muestra el subtotal unitario de cada producto
      calculateUnitSubtotal();

      //funcion que calcula el subtotal final
      calculateSubtotal();

      calcularEnvio();

      calculateTotal();
    }
  });
});

// function choosePaymentMethod() {
//   var tarjetaDeCredito = document.getElementById('tarjeta-credito');

//   var numCuenta = document.getElementById('numero-cuenta');

//   if (tarjetaDeCredito.checked) {
//     numCuenta.classList.add()

//   }
// }

var cleave = new Cleave('.input-phone', {
  creditCard: true,
  onCreditCardTypeChanged: function (type) {
      // update UI ...
  }
});

function disableMethod() {

  let selectCreditCard = document.getElementById('tarjeta-credito');
  let selectTransfer = document.getElementById('transfer');

  let nroTarjeta = document.getElementById('creditCard');
  let securityCode = document.getElementById('code');
  let vencimiento = document.getElementById('vence');

  let nroCuenta = document.getElementById('numero-cuenta');

  if (selectCreditCard.checked) {
    nroCuenta.setAttribute('disabled', '');

    nroTarjeta.disabled = false;
    securityCode.disabled = false;
    vencimiento.disabled = false;

  } else if (selectTransfer.checked) {
    nroCuenta.disabled = false;

    nroTarjeta.setAttribute('disabled', '');
    securityCode.setAttribute('disabled', '');
    vencimiento.setAttribute('disabled', '');
  }
}
