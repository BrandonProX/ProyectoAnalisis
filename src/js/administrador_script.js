//Mostrar sections al presionar opciones del sidebar
document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar nav ul li a');

    sidebarItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const sections = document.querySelectorAll('section');
                sections.forEach(function(section) {
                    section.style.display = 'none';
                });
                targetSection.style.display = 'block';
            }
        });
});


    /**
     * body de tabla tableReports
     **/
    const people = [
        {
            "id": 123456,
            "name": "Pedro Esteban Agusto Galindo",
            "grado": "6to primaria",
            "estado": true
        },
        {
            "id": 7890,
            "name": "Ana María del Rosario",
            "grado": "3ro básico",
            "estado": false
        },
        {
            "id": 9876226,
            "name": "Agustiniano raro del parque",
            "grado": "1ero primaria",
            "estado": true
        }
    ];


    /**
     * Segmento de código que genera el body de la tabla de Informes y análisis
     */
    const tableReportsBody = document.querySelector("#tableReportsBody");
    let body = "";
    for(let person of people){
        body += `
            <tr>
                <td>${person.id}</td>
                <td>${person.name}</td>
                <td>${person.grado}</td>
                <td>${(person.estado ? "Solvente" : "Insolvente")}</td>
            </tr>
        `;
    }
    tableReportsBody.innerHTML = body;
});

const listaalumnos = [
    {
        "id_alumno": 1,
        "primer_nombre": "juan",
        "primer_apellido": "perez",
        "id_clase": 1
    },
    {
        "id_alumno": 2,
        "primer_nombre": "juan",
        "primer_apellido": "perez",
        "id_clase": 1
    },
    {
        "id_alumno": 3,
        "primer_nombre": "juan",
        "primer_apellido": "perez",
        "id_clase": 1
    },
    {
        "id_alumno": 4,
        "primer_nombre": "juan",
        "primer_apellido": "perez",
        "id_clase": 1
    },
    {
        "id_alumno": 5,
        "primer_nombre": "gustavo",
        "primer_apellido": "perez",
        "id_clase": 1
    }
];

const tablaAlumnos = document.querySelector("#tablaAlumnos");
let body = "";
for(let person of listaalumnos){
    body += `
        <tr>
            <td>${person.id_alumno}</td>
            <td>${person.primer_nombre+" "+person.primer_apellido}</td>
            <td><input type="checkbox" class="asistencia-checkbox"></td>
        </tr>
    `;
}
tablaAlumnos.innerHTML = body;



// Configurar la URL de la API
const apiUrl = 'http://127.0.0.1:3000/login';
const alumnosPeticion = [];
const btnAsistencia = document.getElementById('btnAsistencia');


btnAsistencia.addEventListener('click', async (event) => {
    event.preventDefault();
    // Envia al api los datos para actualizar BD
    const jsonAlumnos = JSON.stringify(alumnosPeticion);
    console.log(jsonAlumnos);
    await registrarAsistencia(jsonAlumnos);
});

async function registrarAsistencia(userData) {
    try {
        // Realizar la solicitud POST usando Axios
        const response = await axios.post(apiUrl, userData);
        // Mostrar la respuesta en la página
        if (response.status === 200 || response.data.message == 'Registro exitoso') {
            alert("Asistencia registrada")
        } else {
            // Mostrar mensaje de error si el inicio de sesión falla
            alert('Error al registrar asistencia');
        }
    } catch (error) {
        // Mostrar errores en caso de fallo
        console.error('Error al realizar la solicitud:', error);
        alert('Error al guardar asistencia'); // Inform the user of a failed login
    }
}



// Obtener datos de la tabla
function generarJSON() {

    const tabla = document.getElementById('tablaAlumnos');
    const filas = tabla.getElementsByTagName('tr');
    alumnosPeticion = [];

    for (let i = 1; i < filas.length; i++) {
        const fila = filas[i];
        const celdas = fila.getElementsByTagName('td');

        const idAlumno = celdas[0].innerText;
        const nombre = celdas[1].innerText;
        const asistenciaCheckbox = celdas[2].querySelector('.asistencia-checkbox');

        // Verificar si el checkbox está marcado
        const asistencia = asistenciaCheckbox.checked;

        const alumno = {
            id_alumno: idAlumno,
            nombre: nombre,
            asistencia: asistencia
        };

        alumnosPeticion.push(alumno);
    }

    
}
