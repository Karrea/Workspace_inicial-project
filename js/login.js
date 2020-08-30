

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

//Probando


// Ya no hay pass
//let pass = document.getElementById("pass")

// Intentando guardar el mail de magic link
//const userMail = localStorage.setItem(userMetadata.email);

// ================================== Magic link login ==================================

const magic = new Magic("pk_test_EFE49F975C58188E"); 

    // Render function
    const render = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    /* Show login form if user is not logged in */
    let html = `
      <h1>Please sign up or login</h1>
      <form onsubmit="handleLogin(event)">
        <input id='user' type="email" name="email" required="required" placeholder="Enter your email" />
        <button type="submit">Send</button>
      </form>
    `;
    if (isLoggedIn) {
      /* Get user metadata including email */
      const userMetadata = await magic.user.getMetadata();
      html = `
        <h1>Current user: ${userMetadata.email}</h1>
        <button onclick="handleLogout()">Logout</button>
      `;
      toHome();
      const userEmail = document.getElementById("user").value;
      localStorage.setItem('mail', userEmail);
    } 
    document.getElementById("app").innerHTML = html;
  };

  const handleLogin = async e => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    if (email) {
      /* One-liner login 🤯 */
      await magic.auth.loginWithMagicLink({ email });
      render();
    }
  };

  const handleLogout = async () => {
    await magic.user.logout();
    render();
  };
  // ===================================


function toHome() {
    //if (user.value && pass.value) {
        location.href = "home.html";
    //} else {
    //    alert("Debes ingresar tus credenciales");
    //}
}

//Google button
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }


  