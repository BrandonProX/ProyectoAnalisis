// Previsualizar imagen registro
const imageInput = document.getElementById('imagenperfil');
    const previewImage = document.getElementById('preview-image');

    imageInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        previewImage.src = '#';
      }
    });


// Comprobar claves y validar que no este vacia
function comprobarClave() {
  // Obtener las claves desde los campos de entrada
  const clave1 = document.f1.clave1.value;
  const clave2 = document.f1.clave2.value;

  // Validar que las claves no estén vacías
  if (clave1 === '' || clave2 === '') {
    alert("Por favor ingrese ambas claves.");
    return;
  }

  // Comprobar si las claves son iguales
  if (clave1 === clave2) {
    alert("Las dos claves son iguales...\nINGRESA A TU PERFIL");
  } else {
    alert("Las dos claves son distintas...\nNO PUEDES INGRESAR A TU PERFIL");
  }
}

// transicion entre el login y el register

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', ()=>{
  container.classList.add("active");
});

loginBtn.addEventListener('click', ()=> {
  container.classList.remove("active");
});


// mostrar contraseñas
function mostrarContrasena(idInput) {
  var input = document.getElementById(idInput);
  var boton = input.nextElementSibling; // El botón siguiente al input

  if (input.type === "password") {
      input.type = "text";
      boton.textContent = "Ocultar";
  } else {
      input.type = "password";
      boton.textContent = "Mostrar";
  }
}

// 