var product = {};
var comments = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
    }
    document.getElementById("productImgs").innerHTML = htmlContentToAppend;
}

function showComments (array) {
    let htmlContentToAppend = `
    <h2> <b> Comentarios </b> </h2>
    <br> 
    `;

    for(let i = 0; i < array.length; i++){
        let comment = array[i];

        htmlContentToAppend += `
        <div> 
          <p> <b> ${comment.user} </b> dice </p>
          <p style='font-size: 12px;'> ${comment.dateTime} </p>
          `
          
          for (let i = 0; i <= 4; i++) {
              if ( i < comment.score) htmlContentToAppend += `<span class="fa fa-star checked"> </span>`
              else htmlContentToAppend += `<span class="fa fa-star"></span>`
            };
          
          htmlContentToAppend += `<p> ${comment.description} </p>
          <hr>
        </div>
        `
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
    document.getElementById("comments").innerHTML += `
    <div> 
        <h3> Comentar </h3>
        <br> <b> 
        Usuario: </b> <input type='text' readonly disabled value='${localStorage.getItem('mail')}'> 
        <br> <br> 
        
        <b> Comentar: </b> 
        <textarea class="align-top" rows="3" id="commentarea" name="comment"></textarea>
        <br>

        <b> Score: </b>
        <select size="4">
            <option id="1"> 1 </option>
            <option id="2"> 2 </option>
            <option id="3"> 3 </option>
            <option id="4"> 4 </option>
            <option id="5"> 5 </option>
        </select>
        <br>

        <button class='btn btn-secondary' onClick='puntuar()'> Enviar </button>
    </div>


    `
}

/* 
        <div id='estrellitas' class="btn-group" > 
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                Score <span class="caret"></span>
            </button>

            <ul class="dropdown-menu" role="menu" style='text-align: center'>
                <a class="dropdown-item"> 1 </a>
                <a class="dropdown-item" href="#">Dropdown link</a>
            </ul>
        </div>
        <br>

        

    */

function addEstrellas() {
    var uno = document.getElementById('1');
    var dos = document.getElementById('2');
    var tres = document.getElementById('3');
    var cuatro = document.getElementById('4');
    var cinco = document.getElementById('5');

    if (uno.selected) {
        return uno.id;
    } else if (dos.selected) {
        return dos.id;
    } else if (tres.selected) {
        return tres.id;
    } else if (cuatro.selected) {
        return cuatro.id;
    } else if (cinco.selected) {
        return cinco.id;
    }
    


} 

  //  <span class="fa fa-star checked"></span>


//Fecha y Hora
var d = new Date();
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var dias = new Array ("Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo");
var año= d.getFullYear();
var mes_num = d.getMonth();
var mes_nom= meses[d.getMonth() - 1];
var dia_num = d.getDate();
var dia_nom= dias[d.getDay() - 1];
var hora= d.getHours();
var min= d.getMinutes();
var seg = d.getSeconds();
//Fecha y Hora

function puntuar() {
    var inputValue = document.getElementById('commentarea').value;
    var newComment = {
        "score": addEstrellas(),
        "description": inputValue,
        "user": localStorage.getItem('mail'),
        "dateTime": "hace unos segundos"
        }
    comments.push(newComment);
    showComments(comments);
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCantHTML = document.getElementById("productCant");
            let productCostHTML = document.getElementById("productCost");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCantHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    } );

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(status) {
        if(status.status === "ok") 
        {
            comments = status.data;

            let comentario = document.getElementById('comments');

            comentario.innerHTML = comments.user;

            showComments(comments);
        }
    })
});