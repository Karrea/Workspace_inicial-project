var profileDatos = {};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    checkData()

});

function saveDatos () {
    let nombre = document.getElementById('name');
    let apellido = document.getElementById('apellido');
    let email = document.getElementById('email');
    let celular = document.getElementById('cel');

    profileDatos = {
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        celular: celular.value
    }

    localStorage.setItem('datos', JSON.stringify(profileDatos));
}

function checkData() {
    let divDatos = document.getElementById('datosPerfil');
    
    let sessionName = localStorage.getItem('userName');
    
    let datos = JSON.parse(localStorage.getItem('datos'));

    if (profileDatos.length > 0 || datos) {
        console.log('entra en el if');
        let toAppend = `
                <div class="row py-2">
                    <div class="col-md-6"> <label for="firstname"> Nombre </label> <input type="text" id='name' class="bg-light form-control" placeholder="" value='${sessionName}'> </div>
                    <div class="col-md-6 pt-md-0 pt-3"> <label for="lastname"> Apellido </label> <input type="text" id='apellido' class="bg-light form-control" value='${datos.apellido}'> </div>
                </div>
                <div class="row py-2">
                    <div class="col-md-6"> <label for="email"> Email </label> <input type="text" id='email' class="bg-light form-control" value="${datos.email}"> </div>
                    <div class="col-md-6 pt-md-0 pt-3"> <label for="phone"> Número de teléfono </label> <input type="tel" id='cel' class="bg-light form-control" value="${datos.celular}"> </div>
                </div>
                `;

        divDatos.innerHTML += toAppend;
    } else {
        console.log('entra en el else');
        let toAppend = `
                <div class="row py-2">
                    <div class="col-md-6"> <label for="firstname"> Nombre </label> <input type="text" id='name' class="bg-light form-control" value='${sessionName}'> </div>
                    <div class="col-md-6 pt-md-0 pt-3"> <label for="lastname"> Apellido </label> <input type="text" id='apellido' class="bg-light form-control" placeholder="Correa"> </div>
                </div>
                <div class="row py-2">
                    <div class="col-md-6"> <label for="email"> Email </label> <input type="text" id='email' class="bg-light form-control" placeholder="correa_@email.com"> </div>
                    <div class="col-md-6 pt-md-0 pt-3"> <label for="phone"> Número de teléfono </label> <input type="tel" id='cel' class="bg-light form-control" placeholder="+598 xxx xxx"> </div>
                </div>
                `;

        divDatos.innerHTML += toAppend;
    }
}