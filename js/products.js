var productsArray = [];

// Sort 
const ORDER_ASC_BY_PRICE = "$-$$";
const ORDER_DESC_BY_PRICE = "$$-$";
const ORDER_BY_PROD_REL = "Rel.";
var currentSortCriteria = undefined;

// Filter vars
var minCount = undefined;
var maxCount = undefined;

// Funcion que ordena los productos segun el precio y la relevancia
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
// --------------------------------------------------------------

// Mostrar la lista de productos por default 
function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
        
                htmlContentToAppend += `
                <div class="col-md-4">
                  <div class="card mb-4 shadow-sm">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail" width='100%'>
                    <div class="card-body">
                      <h5 class="card-title">`+ product.name +`</h5>
                      <p class="card-text">${product.description}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div> 
                          <button type="button" class="btn btn-sm btn-outline-secondary" onclick='location.href="product-info.html"'> Comprar </button>
                          <small class="text-muted">` + product.soldCount + " " + `vendidos </small>
                        </div>
                          <small class="text-muted">` + product.cost + " " + product.currency + `</small>
                      </div>
                    </div>
                  </div>
                </div>
                `
        }
        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }
} // ------------ Mostrar la lista de productos por default ------------

function sortAndShowCategories(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortCategories(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    // Mostrar los datos de los productos si cargo la pagina
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            //Antes de modificar para mque funcione el sort
            productsArray = resultObj.data;
            //showProductsList(productsArray);
            sortAndShowCategories(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    }) 
    // -----------------------------------------------------

    // Ordenar ascendente por precio
    document.getElementById("ordenarAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    }); 

    // -----------------------------------------------------

    // Ordenar descendente por precio
    document.getElementById("ordenarDes").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    // -----------------------------------------------------
    
    // Ordenar por relevancia
    document.getElementById("ordenarByRel").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_REL);
    });

    // -----------------------------------------------------

    // Aplicar filtro de busqueda 
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showProductsList();
});
// -------------------------  -------------------------

    // Limpiar el filtro de busqueda
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
    // --------------- ---------------

}); 

