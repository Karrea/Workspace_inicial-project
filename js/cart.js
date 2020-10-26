var articlesArray = [];
var subtotal = 0;
var unitSubtotal = subtotal;
var envio;
var total;
var usdPrice;

var metodosDePago = [];


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
  if (articlesArray.length === 0) {
    let conteinerPrincipal = document.getElementById('contenidoPrincipal');
    toAppend = `

    <div class='container' id='contenidoPrincipal'>
    <div class='text-center p-4'>
      <!-- Header -->
      <h1> Carrito </h1>
      <p class='lead'> Termina tu compra </p>
      <!-- Header -->
    </div>

    <div class="alert alert-warning" style="position: relative;  top: 0;" id='noHayArticulos'>
      <h5 class="alert-heading "> Parece que no tienes articulos en tu carrito! </h5>
      <p> Ve a <a href='categories.html'> categorias </a> y empieza a comprar</p>
    </div>
    
  </div>
    
    `
    conteinerPrincipal.innerHTML = toAppend;
  }

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

  var conteiner = document.getElementById('contenidoPrincipal');
  toAppend = `
    <div>
    <!-- container para Tabla de articulos  -->
    <div class="p-5 d-flex justify-content-center" id='tableContainer'>

      <!-- tabla de articulos  -->
      <table class='table' id='tabla'>
        <thead class='thead-dark'>
          <tr class=''>
            <th id='product' class='text-center'> Producto </th>
            <th id='precioUnitario'> Precio </th>
            <th id='cantidad'> Cantidad </th>
            <th id='subtotalTitle'> Subtotal </th>
            <th id='delete-item'> Eliminar </th>
          </tr>
        </thead>
        <tbody id='tableBody'>
          <!-- Aqui se inyectan los articulos desde el js -->
        </tbody>

      </table>
      <!-- tabla de  articulos-->

    </div>
    <!-- container para tabla de articulos -->

    <!-- Costos -->

    <form class='needs-validation' onsubmit='return proccesPago(event)'>
      <!-- row -->
      <div class="row justify-content-md-center">

        <!-- Columna -->
        <div class="col-md-8 order-md-1">

          <h5 class="mb-3"> Tipo de envio </h5>

          <!-- nuevo div de tipo de envio -->
          <div class="form-check">
            <input class="form-check-input" type="radio" name="shippingType" id="premiumRadio" value="option1"
              onclick="alCambiarEnvio()" checked>
            <label class="form-check-label" for="premiumRadio">
              Premium 2 a 5 días (15%)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="shippingType" id="expressRadio" value="option2"
              onclick="alCambiarEnvio()">
            <label class="form-check-label" for="expressRadio">
              Express 5 a 8 días (7%)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="shippingType" id="estandarRadio" value="option3"
              onclick="alCambiarEnvio()">
            <label class="form-check-label" for="estandarRadio">
              Estándar 12 a 15 días (3%)
            </label>
          </div>
          <!-- fin nuevo div de tipo de envio -->
        </div>
        <!-- fin Columna -->

      </div>
      <!-- fin row -->

      <br>

      <!-- row -->
      <div class="row justify-content-md-center">

        <!-- Columna -->
        <div class="col-md-8 order-md-1">

          <!-- Div de costos -->
          <div id='costos'>

            <!-- Aca va la lista de costos -->

          </div>
          <!-- fin Div de costos -->

        </div>

      </div>





      <!-- Ventana modal -->
      <div class="modal fade" tabindex="-1" role="seleccionarMetodoDePago" id="modalCarrito">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- modal header -->
            <div class="modal-header">
              <b class="modal-title"> Forma de pago </b>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <!-- modal header -->
            <!-- modal body -->
            <div class="modal-body ">
              <div class="container">
                
                <!-- radio input -->
                <label> Tarjeta de crédito</label>
                <input type='radio' name='transfer' id='tarjeta-credito' onclick='disableMethod()'>

                <div class="row p-2">

                <div class="col p-2 form-check">

                    <label> Nombre del titular </label>
                    <input class='input-phone' type='text' id='titularCard'>

                  </div>

                  <div class="col p-2 form-check">

                    <label> Nro de la tarjeta </label>
                    <input class='input-phone' type='text' id='creditCard'>

                  </div>



                  <div class="col p-2">


                    <label> Código de seguridad </label>
                    <input type='text' id='code'>


                  </div>



                  <div class="col p-2">

                    <label> Vencimiento </label>
                    <br>
                    <input type='text' id='vence'>


                  </div>

                </div>

                <!-- Transferencia bancaria -->
                <div > 


                  <label > Transferencia bancaria </label>
                  <input type='radio' name='transfer' id='transfer' onclick='disableMethod()'>

                  <div class="row p-2">

                    <div class="col p-2">


                      <label> Titular de la cuenta </label>
                      <input type='text' class='form-control' id='titular-cuenta'>

                      <label> Nro de cuenta </label>
                      <input type='text' class='form-control' id='numero-cuenta'>

                    </div>
                  </div>

                </div>

              </div>
              <!-- fin modal body -->
            </div>
            <!-- modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onclick='saveCreditCardData()' data-dismiss="modal">Agregar</button>
            </div>
            <!-- fin modal footer -->
          </div>
        </div>
      </div>
      <!-- fin Ventana modal -->


      <!-- row -->
      <div class="row justify-content-md-center">

        <!-- Columna -->
        <div class="col-md-8 order-md-1">

          <!-- Direccion de envio -->
          <div >

            <h4> Dirección de envio </h4>

            <div class="row pt-2"> 

              <div class="col">

                <label> Departamento </label>
                <select class="custom-select d-block w-100" id="productCategory">
                  <option value="" class='form-control'> Elegir departamento</option>
                  <option>Artigas</option>
                  <option>Canelones</option>
                  <option>Cerro Largo</option>
                  <option>Colonia</option>
                  <option>Durazno</option>
                  <option>Flores</option>
                  <option>Florida</option>
                  <option>Lavalleja</option>
                  <option>Maldonado</option>
                  <option>Montevideo</option>
                  <option>Paysandú</option>
                  <option>Río Negro</option>
                  <option>Rivera</option>
                  <option>Rocha</option>
                  <option>Salto</option>
                  <option>San José</option>
                  <option>Soriano</option>
                  <option>Tacuarembó</option>
                  <option>Treinta y Tres</option>
                </select>
              </div>

              <div class="col">

                <label> Calle </label> 
                <br>
                <input type='text' class='form-control' required>
              </div>



            </div>

            <div class="row pt-4">

              <div class="col">

                <label> Número </label>
                <input type='text' class='form-control' style= 'width:100px' required>
              </div>

            </div>

          </div>


          <!-- Fin Direccion de envio -->

          <hr>



          <!-- Metodo de pago -->

            <h4> Metodo de pago </h4>
            <button type="button" class="m-1 btn btn-link" data-toggle="modal" data-target="#modalCarrito"> Seleccionar
            </button>

          
              <!-- tabla de metodo de pago  -->
          <table class='table' id='tabla-pago'>
            <tbody id='tablePagoBody'>
              
            </tbody>

          </table>
          <!-- fin Metodo de pago -->


          <hr class="mb-4">

          <button class="btn btn-primary btn-lg" type="submit" > Finalizar compra </button>

          <br>
          <br>
          <br>



        </div>
        <!-- fin col -->



      </div>
      <!-- fin row -->

    </form>
  </div>
  `;

  conteiner.innerHTML += toAppend;



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

// cleave.js para formatear el contenido del input mientras se esta escribiendo,
// por ahora no lo usaré
// var cleave = new Cleave('creditCard', {
//   creditCard: true,
//   onCreditCardTypeChanged: function (type) {
//       // update UI ...
//   }
// });

function disableMethod() {

  let selectCreditCard = document.getElementById('tarjeta-credito');
  let selectTransfer = document.getElementById('transfer');

  let titularCard = document.getElementById('titularCard');
  let nroTarjeta = document.getElementById('creditCard');
  let securityCode = document.getElementById('code');
  let vencimiento = document.getElementById('vence');

  let nroCuenta = document.getElementById('numero-cuenta');
  let titularCuenta = document.getElementById('titular-cuenta');

  

  if (selectCreditCard.checked) {
    nroCuenta.setAttribute('disabled', '');
    titularCuenta.setAttribute('disabled', '');

    titularCard.disabled = false;
    nroTarjeta.disabled = false;
    securityCode.disabled = false;
    vencimiento.disabled = false;


  } else if (selectTransfer.checked) {
    nroCuenta.disabled = false;
    titularCuenta.disabled = false;

    titularCard.setAttribute('disabled', '');
    nroTarjeta.setAttribute('disabled', '');
    securityCode.setAttribute('disabled', '');
    vencimiento.setAttribute('disabled', '');
  }
}

function saveCreditCardData() {

  let selectCreditCard = document.getElementById('tarjeta-credito');
  let selectTransfer = document.getElementById('transfer');

  let tablaPago = document.getElementById('tablePagoBody');

  let toAppend = ``;


  if (selectCreditCard.checked) {
    let titularCard = document.getElementById('titularCard').value;
    let nroTarjeta = document.getElementById('creditCard').value;
    let securityCode = document.getElementById('code').value;
    let vencimiento = document.getElementById('vence').value;

    localStorage.setItem('storageNroTarjeta', nroTarjeta);
    localStorage.setItem('storageSecurityCode', securityCode);
    localStorage.setItem('storageVencimiento', vencimiento);

    toAppend = `
              <tr> 
                <td class='w-50'> ${titularCard} </td>
                <td id='num-tarjeta'> ${nroTarjeta} </td>
                <td id='vencimiento'> ${vencimiento} </td>
                <td class='text-center'> <input type='radio' name='metodoDePago' class='form-control' checked> </td>
              </tr>
    `;

    tablaPago.innerHTML += toAppend;
    metodosDePago.push(nroTarjeta);


  } else if (selectTransfer.checked) {
    let nroCuenta = document.getElementById('numero-cuenta').value;
    let titularCuenta = document.getElementById('titular-cuenta').value;

    localStorage.setItem('storageNroCuenta', nroCuenta);
    localStorage.setItem('storageTitularCuenta', titularCuenta);

    toAppend = `
    <tr> 
      <td class='w-50'> ${titularCuenta} </td>
      <td id='num-cuenta'> ${nroCuenta} </td>
      <td class='text-center'> <input type='radio' name='metodoDePago' class='form-control' checked> </td>
    </tr>
    `;

    tablaPago.innerHTML += toAppend;
    metodosDePago.push(nroCuenta);
  }
  
}

function proccesPago(event) {
  if (metodosDePago.length == 0) {
    alert('Debes seleccionar un metodo de pago');
    return false 
  }
}

// function addMetodoDePago() {
  
// }


