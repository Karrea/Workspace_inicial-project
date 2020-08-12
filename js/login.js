//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

//Probando
let user = document.getElementById("user");
let pass = document.getElementById("pass")

function toHome() {
    if (user.value && pass.value) {
        location.href = "file:///C:/Users/Mati/Desktop/Cursos/JaP/fase%202/eMercado%20week%200/home.html";
    } else {
        alert("Debes ingresar tus credenciales");
    }
}