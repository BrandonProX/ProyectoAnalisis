

// Configurar la URL de la API
const apiUrl = 'http://3.144.48.177:3000/login';

const btnLogin = document.getElementById('btnIngresar');


btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    const userData = {
        usuario: document.getElementById('user').value,
        contrasena: document.getElementById('loginPass').value
    };
    await login(userData);
});

async function login(userData) {
    try {
        // Realizar la solicitud POST usando Axios
        const response = await axios.post(apiUrl, userData);
        // Mostrar la respuesta en la página
        if (response.status === 200 || response.data.message == 'Inicio de sesión exitoso') {
            window.location.href = 'Dashboard_Administrador.html';
        } else {
            // Mostrar mensaje de error si el inicio de sesión falla
            alert('Error al realizar login');
        }
    } catch (error) {
        // Mostrar errores en caso de fallo
        console.error('Error al realizar la solicitud:', error);
        alert('Error al realizar login'); // Inform the user of a failed login
    }
}
