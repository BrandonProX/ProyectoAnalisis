const urlAnuncio = 'http://localhost:3000/anuncio';

// Obtener la fecha actual en el formato YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// Establecer la fecha actual en el campo de fecha
document.getElementById('fecha').value = today;

// Obtener el formulario y los campos
const form = document.getElementById('threadForm');
const titleInput = document.getElementById('threadTitle');
const contentInput = document.getElementById('threadContent');

// Obtener el botón de envío
const btnAnuncio = document.getElementById('btnAnuncio');

// Escuchar el evento click del botón de envío
btnAnuncio.addEventListener('click', async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
    // Obtener los valores de los campos
    const titulo = titleInput.value;
    const contenido = contentInput.value;
    const id_profesor = "1"; 


    // Datos del anuncio a enviar
    const data = {
      titulo,
      contenido,
      id_profesor
    };
  
    try {
      // Hacer la solicitud POST utilizando Axios
      const response = await axios.post(urlAnuncio, data);
      alert("Anuncio publicado correctamente!")
      console.log('Respuesta del servidor:', response.data);
      // Manejar la respuesta del servidor aquí (por ejemplo, mostrar un mensaje de éxito)
    } catch (error) {
      alert('Error al publicar anuncio ', error)
      console.error('Error al enviar la solicitud:', error);
      // Manejar el error aquí (por ejemplo, mostrar un mensaje de error)
    }
  });