const CATEGORIES_URL ="https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL ="https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL ="https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL ="https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL ="https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL ="https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

// se declara la variable que toma la navigator bar
var nav;

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showName() {
  nav = document.getElementById("navigatorBar");
  let toAppend = `
    <a class="py-2 d-none d-md-inline-block" href="home.html">Inicio</a>
    <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
    <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
    <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>

    <div class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="perfilButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${localStorage.getItem("mail")} 
      </a>
      <div class="dropdown-menu" aria-labelledby="perfilButton">
        <a class="dropdown-item" href="cart.html"> Mi carrito </a>
        <a class="dropdown-item" href="#"> Mi perfil </a>
        <div class='dropdown-divider'></div> 
        <a class="dropdown-item" onClick='deleteSession()'> Salir </a>
      </div>
    </div>
  `; //

  nav.innerHTML += toAppend;
}

// Funcion que deletea la sesion y vuelve al login
function deleteSession() {
  localStorage.clear();
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function (e) {
  if (nav !== null) {
    showName();
  }
});

