function registrar(){
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
        verificar()
    })

    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        // ...
      });
}

function ingreso(){
    var email= document.getElementById("email2").value;
    var contrasena = document.getElementById('contrasena2').value;

    firebase.auth().signInWithEmailAndPassword(email, contrasena)
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        // ...
      });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log("Hay usuario activo")
        aparece(user)
          // User is signed in.
          console.log("Usuario "+user.email)
          console.log("Verificado "+user.emailVerified)
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
            console.log("No hay usuario activo")
            contenido.innerHTML =`
            <div class="alert alert-primary" role="alert">
                Inicie sesion!
            </div>
          `
          // User is signed out.
          // ...
        }
      });
}
observador();

function aparece(user){

    if (user.emailVerified){
    contenido.innerHTML = 
    `
    <div class="container mt-5">
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
    <p></p>
    <hr>
    <p class="mb-0"></p>
    </div>
    <button onclick="cerrar()" class="btn btn-danger">Cerra sesion</button>
    </div>
    `}
    else{
        
        contenido.innerHTML =`
        <div class="alert alert-warning" role="alert">
            Verifique su mail! ${user.email}
        </div>
        <button onclick="cerrar()" class="btn btn-danger ml-3">Cerra sesion</button>
       `
    }
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        // Agregado para que desaparezca el boton de cerrar sesion
        console.log("saliendo")
    })
    .catch(function(){
        console.log(error)
    })
}

function verificar (){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
        console.log("Enviando correo")
      // Email sent.
    }).catch(function(error) {
        console.log("error")
      // An error happened.
    });
}